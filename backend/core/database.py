from sqlmodel import create_engine, SQLModel, Session
from contextlib import contextmanager

sqlite_filename = "database.db"
sqlite_url = f"sqlite:///{sqlite_filename}"

engine = create_engine(sqlite_url, echo=True)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)

@contextmanager
def get_session():
    with Session(engine) as session:
        yield session