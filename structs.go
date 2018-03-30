package main

import "golang.org/x/net/websocket"

const (
	broadcastTypeOpen   = 1
	broadcastTypeUpdate = 2
	broadcastTypeBullet = 3
)

// ------- CONNECTION -------

// Player defines connection information
type Player struct {
	ID         int `json:"id"`
	connection *websocket.Conn
}

// Update ...
type Update struct {
	BroadcastType int          `json:"type"`
	PlayerID      int          `json:"playerId"`
	Bullet        *Bullet      `json:"bullet"`
	PlayerState   *PlayerState `json:"player"`
}

// Broadcast ...
type Broadcast struct {
	BroadcastType int        `json:"type"`
	ID            int        `json:"id"`
	GameState     *GameState `json:"gameState"`
}

// ------- GAME STATE -------

// GameState holds the state of game
type GameState struct {
	Players []*PlayerState `json:"players"`
	Bullets []*Bullet      `json:"bullets"`
}

// PlayerState defines information of tank
type PlayerState struct {
	ID          int     `json:"id"`
	X           float32 `json:"x"`
	Y           float32 `json:"y"`
	Rotation    float32 `json:"rotation"`
	GunRotation float32 `json:"gunRotation"`
}

// Bullet ...
type Bullet struct {
	ID       int     `json:"id"`
	PlayerID int     `json:"playerId"`
	X        float32 `json:"x"`
	Y        float32 `json:"y"`
	Angle    float32 `json:"angle"`
}
