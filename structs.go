package main

import "golang.org/x/net/websocket"

const (
	broadcastTypeOpen   = 1
	broadcastTypeUpdate = 2
)

// Player defines information to keep
type Player struct {
	id         int     `json:"id"`
	x          float32 `json:"x"`
	y          float32 `json:"y"`
	connection *websocket.Conn
}

// Broadcast ...
type Broadcast struct {
	BroadcastType int    `json:"type"`
	ID            int    `json:"id"`
	Message       string `json:"message"`
	Bullet        Bullet `json:"bullet"`
}

// Bullet ...
type Bullet struct {
	X float32 `json:"x"`
	Y float32 `json:"y"`
}

// Update ...
type Update struct {
	Message string `json:"message"`
	Bullet  Bullet `json:"bullet"`
}

type message struct {
	Message string `json:"message"`
}
