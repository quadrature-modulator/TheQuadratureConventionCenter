import { Players, Workspace, CollectionService } from "@rbxts/services";
import * as PlayerDied from "server/PlayerDiedEventModule";
import { getValidCharacter } from "shared/Util";

function getZoneCenterPosition(zoneNumber: number): Vector3 { return new Vector3(7680 - bit32.lshift(bit32.band(zoneNumber, 15), 10), 0, 7680 - bit32.lshift(bit32.rshift(zoneNumber, 4), 10)); }
function getZoneFromPosition(pos: Vector3): number { return bit32.bor(bit32.rshift(8192 - math.floor(pos.X), 10), bit32.lshift(bit32.rshift(8192 - math.floor(pos.Z), 10), 4)); }

const spawnZoneMap = new Map<Player, number>();
Players.PlayerAdded.Connect(player => {
	const spawnZone = 0;
	const replicationFocus = new Instance("Part");
	replicationFocus.Name = `RepFocus ${player.Name}`;
	replicationFocus.Anchored = true;
	replicationFocus.Transparency = 1;
	replicationFocus.CastShadow = false;
	replicationFocus.CanCollide = false;
	replicationFocus.CanTouch = false;
	replicationFocus.CanQuery = false;
	replicationFocus.Size = Vector3.one;
	replicationFocus.Position = getZoneCenterPosition(spawnZone);
	player.ReplicationFocus = replicationFocus;
	replicationFocus.Parent = Workspace;
	spawnZoneMap.set(player, spawnZone);
});
Players.PlayerRemoving.Connect(player => {
	player.ReplicationFocus?.Destroy();
});
PlayerDied.connect(player => {
	const spawnZone = spawnZoneMap.get(player);
	const repFocus = player.ReplicationFocus;
	assert(spawnZone !== undefined, "Player has no spawn zone!!");
	assert(repFocus, "Player has no replication focus part!!");
	print(`Player "${player.DisplayName}" just died!! lmao!!`);
	repFocus.Position = getZoneCenterPosition(spawnZone);
});
const warpMap = new Map<number, BasePart>();
for(const warp of CollectionService.GetTagged("Func-Warp")) {
	assert(warp.IsA("BasePart"), "warp is not a basepart!!");
	const id = warp.GetAttribute("Id");
	assert(typeIs(id, "number"), "warp has no id!!");
	warpMap.set(id, warp);
}
export function warpPlayer(player: Player, warpId: number) {
	const rf = player.ReplicationFocus;
	assert(rf, "player has no replication focus part");
	const w = warpMap.get(warpId);
	assert(w, "warp could not be found");
	const c = getValidCharacter(player);
	assert(c, "character is invalid");
	rf.Position = getZoneCenterPosition(getZoneFromPosition(w.CFrame.Position));
	c.PivotTo(w.CFrame);
}