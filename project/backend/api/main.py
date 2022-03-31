import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.forests import forests

origins = ["http://localhost:3000"]


log = logging.getLogger("uvicorn")


# Creates an instance of FastAPI as well as adds
# supported middleware and routes
def create_application() -> FastAPI:

    application = FastAPI()
    application.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    application.include_router(
        forests.router,
        prefix="/forests",
        tags=["Forests"],
    )
    return application


app = create_application()


@app.on_event("startup")
def startup_event():
    log.info("Starting application")


@app.on_event("shutdown")
def shutdown_event():
    log.info("Shutting down")
