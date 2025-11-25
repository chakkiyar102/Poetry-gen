const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Validate Z.AI API key
if (!process.env.ZAI_API_KEY || process.env.ZAI_API_KEY === 'your_zai_api_key_here') {
  console.warn('⚠️  WARNING: Z.AI API key not configured!');
  console.warn('Please set your Z.AI_API_KEY in server/.env file');
  console.warn('Get your API key from: https://platform.z.ai/');
  console.warn('The app will use mock poem generation until a valid API key is provided.');
}

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from client directory
app.use(express.static(path.join(__dirname, '../client')));

// Poetry generation endpoint
app.post('/api/generate-poem', async (req, res) => {
  try {
    const {
      location,
      timeOfDay,
      battery,
      weather,
      connectivity,
      orientation,
      apiKey
    } = req.body;

    const context = buildContext(req.body);

    // Use provided API key from request or fall back to environment variable
    const apiKeyToUse = (apiKey && apiKey !== 'your_zai_api_key_here') ? apiKey : process.env.ZAI_API_KEY;

    // Check if Z.AI API key is properly configured
    const hasValidApiKey = apiKeyToUse &&
                           apiKeyToUse !== 'your_zai_api_key_here' &&
                           apiKeyToUse.length > 10;

    if (hasValidApiKey) {
      // Try to use Z.AI API
      try {
        const response = await fetch('https://open.bigmodel.cn/api/paas/v4/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKeyToUse}`
          },
          body: JSON.stringify({
            model: 'glm-4',
            messages: [{
              role: 'user',
              content: `You are a procedural poet. Generate a unique, evocative poem based on these contextual inputs:

${context}

Create a poem that:
- Reflects the mood of the time and environment
- Uses vivid, sensory imagery
- Is 8-16 lines long
- Has a natural rhythm (doesn't need to rhyme)
- Captures the ephemeral nature of this specific moment

Return ONLY the poem text, no title or preamble.`
            }],
            max_tokens: 1000,
            temperature: 0.8
          })
        });

        if (response.ok) {
          const data = await response.json();
          if (data.choices && data.choices[0] && data.choices[0].message) {
            const poem = data.choices[0].message.content.trim();
            console.log('✅ Generated AI poem using Z.AI API');

            return res.json({
              poem,
              metadata: req.body,
              timestamp: new Date().toISOString(),
              source: 'zai-api'
            });
          }
        }
      } catch (apiError) {
        console.warn('⚠️  Z.AI API failed, falling back to mock generation:', apiError.message);
      }
    }

    // Mock poem generation (fallback or when API key not configured)
    const mockPoems = [
      `${location?.city || 'This city'} awakens slowly,\nbattery ${battery > 50 ? 'strong' : 'fading'} like morning light,\n${timeOfDay || 'now'} carries whispers of possibility,\neach moment a verse waiting to be written.`,

      `In ${location?.city || 'this place'}, the ${timeOfDay?.split(':')[0] || 'current'} hour\nholds steady at ${battery || 'unknown'} percent energy,\nconnections pulse like ${connectivity || 'silent'} heartbeats,\na poem born from sensor and soul.`,

      `${timeOfDay || 'Time'} flows through ${location?.city || 'unknown streets'},\n${battery > 70 ? 'fully charged' : battery > 30 ? 'half alive' : 'nearing rest'} like the moon above,\n${connectivity ? 'wires hum' : 'silence speaks'} in digital rhythm,\nthis ephemeral moment captured in verse.`
    ];

    const poem = mockPoems[Math.floor(Math.random() * mockPoems.length)];
    console.log('📝 Generated mock poem based on context:', context);

    res.json({
      poem,
      metadata: req.body,
      timestamp: new Date().toISOString(),
      source: hasValidApiKey ? 'mock-fallback' : 'mock'
    });

  } catch (error) {
    console.error('Error generating poem:', error);
    res.status(500).json({ error: 'Failed to generate poem' });
  }
});

function buildContext(data) {
  const { location, timeOfDay, battery, weather, connectivity, orientation } = data;

  let context = [];

  // Time context
  if (timeOfDay) {
    const hour = new Date().getHours();
    const timePhase = hour < 6 ? 'pre-dawn' :
                     hour < 12 ? 'morning' :
                     hour < 17 ? 'afternoon' :
                     hour < 21 ? 'evening' : 'night';
    context.push(`Time: ${timePhase} (${timeOfDay})`);
  }

  // Location context
  if (location) {
    context.push(`Location: ${location.city || 'unknown city'}, ${location.country || 'unknown country'}`);
    if (location.weather) {
      context.push(`Weather: ${location.weather}`);
    }
  }

  // Battery metaphor
  if (battery !== undefined) {
    const energyLevel = battery > 80 ? 'abundant energy' :
                       battery > 50 ? 'steady energy' :
                       battery > 20 ? 'waning energy' : 'fading energy';
    context.push(`Energy state: ${energyLevel} (${battery}% battery)`);
  }

  // Connectivity metaphor
  if (connectivity) {
    context.push(`Connection: ${connectivity}`);
  }

  // Orientation/motion
  if (orientation) {
    context.push(`Physical state: ${orientation}`);
  }

  return context.join('\n');
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Poetry server running on port ${PORT}`);
  console.log(`Open http://localhost:${PORT} to access the app`);
});