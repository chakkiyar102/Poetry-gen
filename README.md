# Procedural Poetry Generator

A beautiful sensor-aware poetry generator that creates unique poems based on your device's contextual data.

## Features

- **🌍 Location-aware**: Uses geolocation to inform poetry themes
- **⏰ Time-sensitive**: Responds to time of day with appropriate moods
- **🔋 Battery metaphor**: Interprets battery level as energy states
- **📶 Connectivity**: Reflects network connection quality in themes
- **🎨 Dynamic UI**: Background gradients change based on time of day
- **📱 Responsive**: Works beautifully on mobile and desktop
- **💾 Poem History**: Saves generated poems locally for later viewing

## Tech Stack

- **Frontend**: Vanilla HTML/CSS/JavaScript with Tailwind CSS
- **Backend**: Node.js + Express
- **Poetry Engine**: Z.AI GLM API for context-aware poem generation
- **Sensors**: Geolocation, battery, time, device orientation, connectivity

## Setup

### 1. Backend Configuration

```bash
cd server
```

Create a `.env` file:
```
ZAI_API_KEY=your_zai_glm_api_key_here
PORT=3001
```

### 2. Install Dependencies

```bash
npm install express cors dotenv
```

### 3. Run the Server

```bash
node index.js
```

The server will start on `http://localhost:3001`

### 4. Access the Application

Open your browser and navigate to:
```
http://localhost:3001
```

## How It Works

1. **Sensor Collection**: The frontend automatically collects:
   - Current time
   - Battery level
   - Geolocation (city/country)
   - Network connectivity
   - Device orientation

2. **Context Building**: Sensor data is transformed into poetic context:
   - Time of day → mood (pre-dawn, morning, afternoon, evening, night)
   - Battery level → energy state (abundant, steady, waning, fading)
   - Location → place-based imagery
   - Connectivity → social metaphor

3. **Poem Generation**: The context is sent to Z.AI GLM with specific prompts to generate:
   - 8-16 line poems
   - Vivid sensory imagery
   - Natural rhythm (no forced rhyming)
   - Reflection of the specific moment

4. **Display**: Poems are displayed with beautiful glassmorphic styling and saved to local history.

## API Endpoints

### `POST /api/generate-poem`

**Request Body:**
```json
{
  "location": {
    "city": "San Francisco",
    "country": "United States",
    "lat": 37.7749,
    "lon": -122.4194
  },
  "timeOfDay": "14:30:00",
  "battery": 75,
  "connectivity": "4g",
  "orientation": "upright"
}
```

**Response:**
```json
{
  "poem": "Golden afternoon light\nfilters through office windows,\nbattery holds steady at three-quarters,\nthis moment of urban calm\nbefore the evening rush begins.",
  "metadata": { /* original sensor data */ },
  "timestamp": "2025-11-25T05:30:00.000Z"
}
```

## Permissions

The app requests several browser permissions:

- **Location**: For place-based poetic imagery
- **Battery API**: For energy-state metaphors
- **Device Orientation**: For physical state awareness

All permissions are optional - the app will work with whatever data is available.

## Customization

You can customize the poetry prompts by editing the `buildContext()` function and the prompt template in `server/index.js`.

## Browser Support

- Chrome/Edge (full sensor support)
- Firefox (limited sensor support)
- Safari (limited sensor support)

The progressive enhancement ensures the app works even with limited sensor support.