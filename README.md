# Pachama take-home assignment

**Role:** Full-Stack Software Engineer  
**Author:** Andrew Campbell  
**Completed:** March 2022  

---

## Project overview

This repository contains the software developed to satisfy the requirement of Pachama's takehome full stack engineering assignment. **Docker compose** is required to spin up the three containers. These include the database container, the api container, and the container bundling the front-end web application.

Each container image is described in greater detail in the [docker compose](/docker-compose.yml) config.

I have chosen to use **PostgreSQL + PostGIS** for the database, **FastAPI + SQLAlchemy** for the api, and **React + Typescript** for the front-end.

---

## Quick start

Run the following from the project root on a machine running Docker.

Ensure that the you have a .env file located at [/project/frontend](/project/frontend) with a Mapbox api access token mapped to the following key:  

> `VITE_REACT_MAP_ACCESS_TOKEN`

And then run:

> `docker-compose up --build`

Once all services are up and running, you will be able to access the front-end application at [http://localhost:3000](http://localhost:3000). You can also integrate with the API using the Swagger docs at [http://localhost:8004/docs](http://localhost:8004/docs#/).

---

## Database

The base image for the database uses an image that provides tags for running PostgreSQL with PostGIS installed. I'm interested in Pachama's use of maps and geospatial data. Having a background in GIS and spatial data, I wanted to leverage my skillset to bring some ***geo-spice*** to the application.

There are **TWO** databases spun up inside this container. One is to be used for the dev database and will hold the data used across the application. The second database is a carbon copy of the dev one, but it is simply used by the REST API unit tests I have written.

The image's entrypoint script installs the PostGIS extension into the database. It also installs an exension called pg_trgm. I use this extension to assist in fuzzy search string matching which is called upon from the front-end eventually.

I currently prefer to write all migration scripts in python. Therefore I don't execute any sql scripts outside of extension installing. The database models and seeding scripts are contained and executed in the api container.

The schema for the one and only table, ***Forest***, can be viewed [here](./project/backend/api/models/models.py)

A DB Diagram can also be viewed [here](https://dbdiagram.io/d/623d0057bed6183873f591b2).

---

## API

The base image for the API container is the official python base image. This image is responsible for spinning up the Uvicorn server for the FastAPI to run on.

This images entrypoint contains a health check to ensure that the PostgreSQL database is active and running before starting the API. Once the database has connected I exec Python's `alembic upgrade heads` to build the database table based on the initial revision.

**note:** I have had to configure the alembic.ini file to stop the alembic revisions from dropping the required but empty spatial_ref_sys table that comes as part of PostGIS. I have also had to import Python's geoalchemy2 module into the initial revision file to ensure that the spatial column can be built.

Once the table is up, I seed the database using a script. The script uses sqlalchemy to instantiate a connection to the running database and populates rows in the newly created Forest table from a locally hosted geojson file.

### Test-Driven Development

I have applied test-driven development practises to developing the api. I use **pytest** to create a test fixture to run the tests. The fixture function does a couple of things. Firstly, it overrides two dependencies of my FastAPI application. These being the database settings (switches dev to test), and the get_db function (switches from using the dev dbb configured sqlalchemy orm session maker to a test sessionmaker). Finally, the function yields a TestClient instance using our new test configured FastAPI application. This test client is handy as it uses the requests library to make requests against the app.

To run the unit tests, run the following command while the containers are up:
> `docker-compose exec pachama-api python -m pytest -p no:warnings -s`

### REST API Routes

There are two API REST endpoints running on the /forests path. Both can be described in the [Swagger docs](http://localhost:8004/docs#/).

The `/forests` path executes a GET request and intends to fetch a limited view of all forests. This path services the gallery view of the front-end application. I use `fastapi-pagination` to provide out of the box pagination controls over the API route.

The `/forests/{id}` route executes a GET request and intends to fetch the forest in question and return a full view in geojson format. This path services the forest detail page. I have chosen to write the output to geojson by default as I use it in the mapping components on the front-end for a cool geo-viz.

All routes are validated using `pydantic` models to ensure that the response object from the database is what the API is expecting.

### SQLAlchemy

I have used `SQLAlchemy` to transact with the database as required from the API. For the most part, I use the orm as I find it provides an easy to read pattern for less involved queries.

The creation of the geojson object on the `/forests/{id}` path has been done using SQL and executed as text as this query is more complicated.

---

## Front-end

The base image for the front-end application is the official Node image.

I have used [Vite](https://vitejs.dev/) as the build tool for my application using the React + Typescript template. I have used material-ui for the UI components and theme of the application.

The app supports two pages. The first is a gallery view of the forests and provides the ability to filter by forest type as well as search by forest name. The second view is a detailed page of a forest and contains a 3D satellite map showing the forest's location in the context of its local region. This page also provides an information and statistical view of the forest. The app uses routing and the UI to navigate between pages.

React Query is used to fetch and cache data using handy react hooks.

### Considerations and comments

#### Front end tests

Front end tests have not been written for this application due to time constraints. If an extension is to be granted, I am happy to continue writing tests for relevant components.

#### Error messaging in the UI

The application would benefit from having error messages for API fail requests in the UI. As the API is supposed to work as is and only supplies GET requests, I have omitted this from the app.