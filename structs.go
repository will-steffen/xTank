package main

import "golang.org/x/net/websocket"

const (
	broadcastTypeOpen   = 1
	broadcastTypeUpdate = 2
	broadcastTypeBullet = 3
	broadcastTypeHit    = 4
)

// ------- CONNECTION -------

// Player defines connection information
type Player struct {
	ID         int64 `json:"id"`
	connection *websocket.Conn
}

// Update ...
type Update struct {
	BroadcastType int          `json:"type"`
	PlayerID      int64        `json:"playerId"`
	Bullet        *Bullet      `json:"bullet"`
	PlayerState   *PlayerState `json:"player"`
}

// Broadcast ...
type Broadcast struct {
	BroadcastType int        `json:"type"`
	ID            int64      `json:"id"`
	GameState     *GameState `json:"gameState"`
	Hit           *Hit       `json:"hit"`
}

// ------- GAME STATE -------

// GameState holds the state of game
type GameState struct {
	Players []*PlayerState `json:"players"`
	Bullets []*Bullet      `json:"bullets"`
}

// PlayerState defines information of tank
type PlayerState struct {
	ID          int64   `json:"id"`
	X           float64 `json:"x"`
	Y           float64 `json:"y"`
	Rotation    float64 `json:"rotation"`
	GunRotation float64 `json:"gunRotation"`
	Dead        bool    `json:"dead"`
}

// Bullet ...
type Bullet struct {
	ID       int64   `json:"id"`
	PlayerID int64   `json:"playerId"`
	X        float64 `json:"x"`
	Y        float64 `json:"y"`
	Angle    float64 `json:"angle"`
}

// Hit ...
type Hit struct {
	ID       int64 `json:"id"`
	TargetID int64 `json:"targetId"`
	KillerID int64 `json:"killerId"`
}
