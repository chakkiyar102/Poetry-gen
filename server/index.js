const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from client directory
app.use(express.static(path.join(__dirname, '../client')));

// Poetry generation endpoint (mock version for testing)
app.post('/api/generate-poem', async (req, res) => {
  try {
    const {
      location,
      timeOfDay,
      battery,
      weather,
      connectivity,
      orientation
    } = req.body;

    const context = buildContext(req.body);

    // Mock poem generation for testing - replace with real API when fixed
    const mockPoems = [
      `${location?.city || 'This city'} awakens slowly,\nbattery ${battery > 50 ? 'strong' : 'fading'} like morning light,\n${timeOfDay || 'now'} carries whispers of possibility,\neach moment a verse waiting to be written.`,

      `In ${location?.city || 'this place'}, the ${timeOfDay?.split(':')[0] || 'current'} hour\nholds steady at ${battery || 'unknown'} percent energy,\nconnections pulse like ${connectivity || 'silent'} heartbeats,\na poem born from sensor and soul.`,

      `${timeOfDay || 'Time'} flows through ${location?.city || 'unknown streets'},\n${battery > 70 ? 'fully charged' : battery > 30 ? 'half alive' : 'nearing rest'} like the moon above,\n${connectivity ? 'wires hum' : 'silence speaks'} in digital rhythm,\nthis ephemeral moment captured in verse.`
    ];

    const poem = mockPoems[Math.floor(Math.random() * mockPoems.length)];

    console.log('Generated mock poem based on context:', context);

    res.json({
      poem,
      metadata: req.body,
      timestamp: new Date().toISOString()
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