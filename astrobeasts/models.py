from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker

Base = declarative_base()

# Define the Players table
class Player(Base):
    __tablename__ = 'Players'
    
    PlayerID = Column(Integer, primary_key=True)
    username = Column(String)
    password = Column(String)
    inventory = relationship('PlayerInventory', back_populates='player')
    alien_inventory = relationship('AlienInventory', back_populates='player')
    leaderboard = relationship('LeaderBoard', back_populates='player')

# Define the PlayerInventory table
class PlayerInventory(Base):
    __tablename__ = 'PlayerInventory'
    
    InventoryID = Column(Integer, primary_key=True)
    PlayerID = Column(Integer, ForeignKey('Players.PlayerID'))
    Credits = Column(Integer)
    XP = Column(Integer)
    Level = Column(Integer)
    
    player = relationship('Player', back_populates='inventory')

# Define the AlienInventory table
class AlienInventory(Base):
    __tablename__ = 'AlienInventory'
    
    PlayerID = Column(Integer, ForeignKey('Players.PlayerID'), primary_key=True)
    AliensID = Column(Integer, ForeignKey('Aliens.AliensID'), primary_key=True)
    
    player = relationship('Player', back_populates='alien_inventory')
    alien = relationship('Alien', back_populates='alien_inventory')

# Define the Aliens table
class Alien(Base):
    __tablename__ = 'Aliens'
    
    AliensID = Column(Integer, primary_key=True)
    alien_name = Column(String)
    alien_inventory = relationship('AlienInventory', back_populates='alien')
    alien_stats = relationship('AlienStats', uselist=False, back_populates='alien')
    alien_attributes = relationship('AlienAttributesLink', back_populates='alien')

# Define the AlienStats table
class AlienStats(Base):
    __tablename__ = 'AlienStats'
    
    StatsID = Column(Integer, primary_key=True)
    AliensID = Column(Integer, ForeignKey('Aliens.AliensID'))
    HP = Column(Integer)
    XP = Column(Integer)
    Level = Column(Integer)
    
    alien = relationship('Alien', back_populates='alien_stats')

# Define the LeaderBoard table
class LeaderBoard(Base):
    __tablename__ = 'LeaderBoard'
    
    LeaderID = Column(Integer, primary_key=True)
    PlayerID = Column(Integer, ForeignKey('Players.PlayerID'))
    score = Column(Integer)
    
    player = relationship('Player', back_populates='leaderboard')

# Define the AlienAttributes table
class AlienAttributes(Base):
    __tablename__ = 'AlienAttributes'
    
    AttributeID = Column(Integer, primary_key=True)
    Attack1 = Column(String)
    Attack2 = Column(String)
    Attack3 = Column(String)
    Attack4 = Column(String)

# Define the linking table for AlienAttributes and Aliens (many-to-many relationship)
class AlienAttributesLink(Base):
    __tablename__ = 'AlienAttributesLink'
    
    AliensID = Column(Integer, ForeignKey('Aliens.AliensID'), primary_key=True)
    AttributeID = Column(Integer, ForeignKey('AlienAttributes.AttributeID'), primary_key=True)
    
    alien = relationship('Alien', back_populates='alien_attributes')
    attributes = relationship('AlienAttributes')

# Initialize the database connection (SQLite in-memory database)
engine = create_engine('sqlite:///:memory:')
Base.metadata.create_all(engine)

# Create a session to interact with the database
Session = sessionmaker(bind=engine)
session = Session()

# Now you can use session to add new records, commit transactions, etc.
