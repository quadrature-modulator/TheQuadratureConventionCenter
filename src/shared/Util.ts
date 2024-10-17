// basic utilities

export interface ValidCharacter extends Model { Humanoid: Humanoid & { Parent: Model, RootPart: BasePart } }

export function getValidCharacter(player: Player | undefined): ValidCharacter | undefined {
	if(player === undefined || player.Parent === undefined) { return undefined; }
	if(player.Character === undefined || player.Character.Parent === undefined) { return undefined; }
	const h = player.Character.FindFirstChildOfClass("Humanoid");
	if(h === undefined || h.Health <= 0 || h.RootPart === undefined) { return undefined; }
	return player.Character as ValidCharacter;
}