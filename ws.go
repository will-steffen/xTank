package main

import (
	"log"
	"time"

	"golang.org/x/net/websocket"
)

// ------- CONNECTION -------
var players = make([]*Player, 0)

func onWsConnect(wsConn *websocket.Conn) {
	defer wsConn.Close()
	player := Player{
		ID:         len(players),
		connection: wsConn,
	}
	addPlayer(&player)
}

func addPlayer(p *Player) {
	players = append(players, p)
	websocket.JSON.Send(p.connection, Broadcast{
		BroadcastType: broadcastTypeOpen,
		ID:            p.ID,
	})
	p.listen()
}

func (p *Player) listen() {
	for {
		var u Update
		if err := websocket.JSON.Receive(p.connection, &u); err != nil {
			log.Println(err)
			break
		}
		if u.BroadcastType == broadcastTypeBullet {
			updateBullet(&u)
		}
		if u.BroadcastType == broadcastTypeUpdate {
			updatePlayer(&u)
		}
	}
}

func broadcast(b *Broadcast) {
	for _, p := range players {
		websocket.JSON.Send(p.connection, b)
	}
}

// ------- GAME STATE -------
var gameState = GameState{
	Players: make([]*PlayerState, 0),
	Bullets: make([]*Bullet, 0),
}
var lastUpdate = time.Now().UnixNano()

func updateBullet(u *Update) {
	gameState.Bullets = append(gameState.Bullets, u.Bullet)
	calcState()
}

func updatePlayer(u *Update) {
	var p *PlayerState
	for _, player := range gameState.Players {
		if player.ID == u.PlayerID {
			p = player
		}
	}
	if p == nil {
		p = u.PlayerState
		gameState.Players = append(gameState.Players, p)
	} else {
		p.X = u.PlayerState.X
		p.Y = u.PlayerState.Y
		p.Rotation = u.PlayerState.Rotation
		p.GunRotation = u.PlayerState.GunRotation
	}
	calcState()
}

func sendState() {
	b := Broadcast{
		BroadcastType: broadcastTypeUpdate,
		GameState:     &gameState,
	}
	broadcast(&b)
}

func calcState() {
	sendState()
}
