import { Players, Workspace } from "@rbxts/services";



Players.PlayerAdded.Connect((player) => {
	const replicationFocus = new Instance("Part");
	replicationFocus.Name = `RepFocus ${player.Name}`;
	
});
Players.PlayerRemoving.Connect((player) => player.ReplicationFocus?.Destroy());