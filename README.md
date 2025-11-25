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
# Z.AI API Key - Replace with your actual Z.AI API key
# Get your key from: https://platform.z.ai/
ZAI_API_KEY=your_zai_api_key_here
PORT=3001
```

### 2. Install Dependencies

```bash
npm install express cors dotenv
```

### 3. API Key Configuration

You have **two ways** to configure your Z.AI API key:

#### Option A: Server-side (Recommended for production)
- Set your API key in the `server/.env` file above
- The server will use this key for all requests

#### Option B: Client-side (For testing/convenience)
- Leave the server `.env` as is
- Enter your API key directly in the web interface
- The key is stored locally in your browser

🔑 **Getting Your Z.AI API Key:**
1. Visit https://platform.z.ai/
2. Sign up for a Z.AI account
3. Generate an API key
4. Use the key in the configuration area

### 4. Run the Server

```bash
node index.js
```

The server will start on `http://localhost:3001`

### 5. Access the Application

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

## GitHub Pages Deployment

A static version of the poetry generator is available on GitHub Pages and can be accessed without running a local server.

### Accessing the Live Site

1. Visit your GitHub repository: https://github.com/chakkiyar102/Poetry-gen
2. Go to **Settings** > **Pages**
3. Under "Build and deployment", select **Source**: Deploy from a branch
4. Select **Branch**: `gh-pages` and **Folder**: `/ (root)`
5. Click **Save**
6. Your site will be available at: `https://chakkiyar102.github.io/Poetry-gen/`

### Static vs Server Version

The GitHub Pages version works as a **static site** with these differences:

**Static Site (GitHub Pages):**
- ✅ No server required
- ✅ Works directly from browser
- ✅ Direct Z.AI API integration
- ⚠️ API key stored in browser only
- ⚠️ No server-side fallbacks

**Full Server Version:**
- ✅ Complete backend support
- ✅ Dual API key configuration (client + server)
- ✅ Enhanced error handling
- ⚠️ Requires Node.js server to run

### Setting Up GitHub Pages

The gh-pages branch has been created and contains all necessary files. To enable GitHub Pages:

1. **Manual Configuration:**
   - Go to your repository on GitHub
   - Click **Settings** tab
   - Scroll down to **Pages** section
   - Under "Source", select **Deploy from a branch**
   - Choose **Branch**: `gh-pages`
   - Choose **Folder**: `/ (root)`
   - Click **Save**

2. **Wait for Deployment:**
   - GitHub will build your site (takes 1-2 minutes)
   - Check the Pages section for deployment status
   - Once deployed, your site will be accessible at the URL shown

### Features Available on Static Site

- ✅ All sensor data collection (time, battery, location, connectivity)
- ✅ Dynamic time-based backgrounds
- ✅ Z.AI API integration with client-side API key
- ✅ Mock poem generation fallback
- ✅ Poem history storage (browser local storage)
- ✅ Responsive design
- ✅ Glassmorphic UI effects

The static version provides the complete poetry generation experience without requiring any server infrastructure!