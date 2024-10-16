import { Players } from "@rbxts/services";

Players.PlayerAdded.Connect((player) => {
	print(`Hello there, ${player.DisplayName}!`);
});