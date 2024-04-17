from sqlalchemy import create_engine, Column, Integer, String, Boolean, ForeignKey, Table
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker

Base = declarative_base()

#relationships for player and items  in inventory
player_inventory_association = Table('player_inventory', Base.metadata,
    Column('PlayerID', ForeignKey('Players.PlayerID'), primary_key=True),
    Column('ItemID', ForeignKey('InventoryItems.ItemID'), primary_key=True)
)

# relationships for player and astrobeasts in inventory
player_astrobeast_association = Table('player_astrobeast', Base.metadata,
    Column('PlayerID', ForeignKey('Players.PlayerID'), primary_key=True),
    Column('AstroBeastID', ForeignKey('AstroBeasts.AstroBeastID'), primary_key=True)
)

# Define the Players table
class Player(Base):
    __tablename__ = 'Players'
    
    PlayerID = Column(Integer, primary_key=True)
    name = Column(String)
    inventoryItems = relationship('InventoryItem', secondary=player_inventory_association, back_populates='players')
    astroBeasts = relationship('AstroBeast', secondary=player_astrobeast_association, back_populates='players')
    leaderboard = relationship('LeaderBoard', back_populates='player')
    inventory = relationship('PlayerInventory', back_populates='player')
    alien_inventory = relationship('AlienInventory', back_populates='player')



# Define the PlayerInventory table
class PlayerInventory(Base):
    __tablename__ = 'PlayerInventory'
    
    # Correctly define columns with proper indentation
    InventoryID = Column(Integer, primary_key=True)
    PlayerID = Column(Integer, ForeignKey('Players.PlayerID'))  # Make sure the table name is lowercase
    Credits = Column(Integer)
    XP = Column(Integer)
    Level = Column(Integer)

    # Define the relationship, ensuring 'Player' class has 'inventory' attribute for back_populates
    player = relationship('Player', back_populates='inventory')


class InventoryItem(Base):
    __tablename__ = 'InventoryItems'
    ItemID = Column(Integer, primary_key=True)
    name = Column(String)
    description = Column(String)
    quantity = Column(Integer)
    isEquipped = Column(Boolean)
    Player_Name = Column(String, ForeignKey('Players.name'))
    key = Column(String)
    players = relationship('Player', secondary=player_inventory_association, back_populates='inventoryItems')



# Define the AlienInventory table
class AlienInventory(Base):
    __tablename__ = 'AlienInventory'
    
    PlayerID = Column(Integer, ForeignKey('Players.PlayerID'), primary_key=True)
    AliensID = Column(Integer, ForeignKey('Aliens.AliensID'), primary_key=True)
    player = relationship('Player', back_populates='alien_inventory')
    alien = relationship('Alien', back_populates='alien_inventory')


class AstroBeast(Base): #need to adjust to include relationship with stats. stats are not implemented in game yet.
    __tablename__ = 'AstroBeasts'
    AstroBeastID = Column(Integer, primary_key=True)
    name = Column(String)
    description = Column(String)
    quantity = Column(Integer, default=1)
    isEquipped = Column(Boolean)
    key = Column(String)
    Player_Name = Column(String, ForeignKey('Players.name'))
    players = relationship('Player', secondary=player_astrobeast_association, back_populates='astroBeasts')

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

class Move(Base):
    __tablename__ = 'Moves'

    MoveID = Column(Integer, primary_key=True)
    key = Column(String)
    name = Column(String)
    description = Column(String)
    quantity = Column(Integer)
    cost = Column(Integer)
    isEquipped = Column(Boolean)
    Player_Name = Column(String, ForeignKey('Players.name'))

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
engine = create_engine('sqlite:///mydatabase.db')
Base.metadata.create_all(engine)

# Create a session to interact with the database
Session = sessionmaker(bind=engine)
session = Session()

# Now you can use session to add new records, commit transactions, etc.
