# WebGIS-React 🗺️

**WebGIS-React** is a modern, production-ready frontend template for building **interactive web mapping (WebGIS)** applications. It combines **React**, **React Leaflet**, and **Material UI** to deliver a fast, responsive, and extensible mapping interface out of the box — complete with location search, a collapsible sidebar, and a clean component architecture that's easy to customize.

Whether you're building a standalone mapping tool or a full-stack geospatial platform, this template gets you up and running quickly. It integrates seamlessly with the [WebGIS-Django backend](https://github.com/GeoBradDev/WebGIS-Django) for projects that need a PostGIS-powered API, but it can also be used independently with any REST or GeoJSON data source.

---

## 🚀 Get Started the Easy Way

We recommend using the `bootstrap.sh` setup script from the backend project to automatically install and configure both frontend and backend services, including PostgreSQL/PostGIS and Django:

```bash
bash <(curl -s https://raw.githubusercontent.com/GeoBradDev/WebGIS-Django/main/scripts/bootstrap.sh)
````

This script will:

* Clone both frontend and backend repos
* Install required system packages and dependencies
* Create a PostGIS-enabled PostgreSQL database
* Set up environment variables and virtualenv
* Launch both frontend and backend development servers

---

## 🌟 Features

* 🗺️ **Interactive Map** – Built with React Leaflet, supports layers, markers, and popups
* 📍 **Search + Reverse Geocoding** – Location search with Nominatim API integration
* 🧭 **Collapsible Sidebar** – For tools, forms, filters, and future extensions
* 🖌️ **Material UI** – Clean, responsive, and accessible interface
* 🔄 **Dynamic View** – Auto-pans and zooms to searched locations

---

## 🛠️ Tech Stack

| Technology        | Purpose                       |
| ----------------- | ----------------------------- |
| **React**         | Core frontend framework       |
| **React Leaflet** | Map rendering and interaction |
| **Material UI**   | UI components and layout      |
| **Nominatim API** | Location search and geocoding |

---

## ⚡ Manual Setup

### Prerequisites

* Node.js (v16+ recommended)
* npm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Pappas313/WebGIS-React-Project.git

# 2. Navigate to project directory
cd WebGIS-React-Project

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

> The app will be available at: [http://localhost:5173](http://localhost:5173)

---

## 📁 Project Structure

```
WebGIS-React/
├── public/             # Static assets (favicon, icons)
├── src/
│   ├── components/     # Reusable UI and map components
│   ├── hooks/          # Custom hooks (e.g., useGeocoder)
│   ├── App.js          # Main application shell
│   └── main.js         # React/Vite entry point
├── .env                # Environment config (optional)
├── package.json        # Project dependencies and scripts
└── README.md           # Project documentation
```

---

## 🧪 Usage

### MapView Component

* Extend the map with custom layers, GeoJSON, and Leaflet plugins
* Customize markers, tooltips, popups, and basemaps

### Sidebar

* Add tools, forms, filters, or content panels
* Easily repositioned or replaced using Material UI `Drawer`

### Search

* Type a location in the search bar
* The map will pan to the selected location using OpenStreetMap data

---

## 🛠 Customization

### Favicon

1. Add your icon (e.g., `map-icon.svg`) to `public/`
2. Update `public/index.html`:

   ```html
   <link rel="icon" type="image/svg+xml" href="/map-icon.svg" />
   ```

### Environment Variables

Create a `.env` file if needed:

```env
VITE_API_URL=http://localhost:8000/api
```

Use `import.meta.env.VITE_API_URL` inside your components to access it.

### Feature Ideas

* 🔥 Add heatmap or clustering support
* 🧭 Integrate routing or distance calculations
* 🌐 Add multilingual support
* 🗂️ Connect to REST APIs or WebGIS layers

---

## 🔗 Backend Integration

This frontend is designed to pair with:

👉 **[WebGIS-Django Backend](https://github.com/GeoBradDev/WebGIS-Django)** – Includes Django Ninja, Django Allauth (headless), and PostGIS support

---

## 🤝 Contributing

Contributions are welcome!
Please open an issue for bugs or feature requests, or submit a pull request directly.

---

## 📄 License

MIT © [GeoBrad.dev](https://geobrad.dev)

---

## 🙏 Acknowledgments

* [React](https://reactjs.org/)
* [Leaflet](https://leafletjs.com/)
* [Material UI](https://mui.com/)
* [OpenStreetMap / Nominatim](https://nominatim.openstreetmap.org/)
