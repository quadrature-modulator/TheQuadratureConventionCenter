import Net from "@rbxts/net";

const Remotes = Net.Definitions.Create({
	CooldownProximityPrompt: Net.Definitions.ServerToClientEvent<[proximityPrompt: ProximityPrompt]>()
});

export default Remotes;