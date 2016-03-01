# Seismic-viz frontend

This is the client-side code designed to be used with [seismic-viz](https://github.com/seismic-viz).

Based on [Simple Redux Boilerplate](https://github.com/tsaiDavid/)

```
git clone https://github.com/g-div/seismic-frontend
```

# Installation

Run the following command in the root directory of the project:
```
npm install
```

# Development

To start the development server, run:
```
npm run dev
```

Then open [http://localhost:1337](http://localhost:1337) in your browser.

# Deployment

The project can be deployed to a remote server using:
```
npm run deploy
```

This will build the project and then use _rsync_ to copy the static files to the server specified in the `config` section of the `package.json`.

You need SSH access to the target machine in order to successfully deploy the project.

### Credits

The OSM Bright map style including the Open Sans font are from the [osm2vectortiles example](https://github.com/osm2vectortiles/mapbox-gl-js-example)