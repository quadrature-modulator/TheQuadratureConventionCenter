import { Players, ServerStorage } from "@rbxts/services";

export const event = new Instance("BindableEvent");
event.Parent = ServerStorage;

Players.PlayerAdded.Connect((player) => {
	player.CharacterAdded.Connect((char) => {
		const humanoid = char.FindFirstChildOfClass("Humanoid")!;
		humanoid.Died.Once(() => { event.Fire(player); });
	});
});

export function connect(callback: (player: Player) => void): RBXScriptConnection { return event.Event.Connect(callback); }