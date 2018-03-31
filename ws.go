package main

import (
	"fmt"
	"log"
	"math"
	"time"

	"golang.org/x/net/websocket"
)

// ------- CONNECTION -------
var players = make([]*Player, 0)

func onWsConnect(ws *websocket.Conn) {
	player := Player{
		ID:         time.Now().UnixNano(),
		connection: ws,
	}
	defer removePlayer(&player)
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

func removePlayer(p *Player) {
	removePlayerState(p.ID)
	removePlayerConnection(p.ID)
	p.connection.Close()
}

func removePlayerConnection(ID int64) {
	nGS := make([]*Player, 0)
	for _, player := range players {
		if player.ID != ID {
			nGS = append(nGS, player)
		}
	}
	players = nGS
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
		if p.connection.IsServerConn() {
			if err := websocket.JSON.Send(p.connection, b); err != nil {
				fmt.Println(err.Error())
			}
		}
	}
}

const (
	gameWidth  = 900
	gameHeight = 600
)

// ------- GAME STATE -------
var gameState = GameState{
	Players: make([]*PlayerState, 0),
	Bullets: make([]*Bullet, 0),
}
var lastUpdate = time.Now().UnixNano()
var sendStateControl = false
var delta int64

func updateBullet(u *Update) {
	u.Bullet.ID = time.Now().UnixNano()
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

func removePlayerState(ID int64) {
	nGS := make([]*PlayerState, 0)
	for _, player := range gameState.Players {
		if player.ID != ID {
			nGS = append(nGS, player)
		}
	}
	gameState.Players = nGS
}

func sendState() {
	b := Broadcast{
		BroadcastType: broadcastTypeUpdate,
		GameState:     &gameState,
	}
	broadcast(&b)
}

func calcState() {
	setDelta()
	calcBullets()
	calcHits()
	if sendStateControl {
		sendStateControl = false
		sendState()
	}

}
func calcBullets() {
	distance := float64(delta / 2000000)
	nGS := make([]*Bullet, 0)
	for _, bullet := range gameState.Bullets {
		bullet.X += distance * math.Cos(bullet.Angle-math.Pi/2)
		bullet.Y += distance * math.Sin(bullet.Angle-math.Pi/2)
		if bullet.X > gameWidth || bullet.X < 0 || bullet.Y > gameHeight || bullet.Y < 0 {

		} else {
			nGS = append(nGS, bullet)
		}
	}
	gameState.Bullets = nGS
}
func calcHits() {

}

func setDelta() {
	now := time.Now().UnixNano()
	delta = now - lastUpdate
	lastUpdate = now
}

func broadcastService() {
	ticker := time.NewTicker(10 * time.Millisecond)
	for range ticker.C {
		sendStateControl = true
	}
	ticker.Stop()
}
