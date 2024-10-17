import { CollectionService } from "@rbxts/services";
import * as PlayerWarpingModule from "./PlayerWarpingModule";
import Remotes from "shared/Remotes";
import * as Util from "shared/Util";

for(const part of CollectionService.GetTagged("Func-Door")) {
	const objectText = part.GetAttribute("ObjectText") ?? "";
	assert(typeIs(objectText, "string"), "ObjectText is not a string!");
	const actionText = part.GetAttribute("ActionText") ?? "";
	assert(typeIs(actionText, "string"), "ActionText is not a string!");
	const warpId = part.GetAttribute("WarpId");
	assert(typeIs(warpId, "number"), "WarpId is not a number or undefined!");
	const pp = new Instance("ProximityPrompt");
	pp.ObjectText = objectText;
	pp.ActionText = actionText;
	pp.RequiresLineOfSight = false;
	pp.MaxActivationDistance = 6;
	pp.Triggered.Connect(player => {
		Remotes.Server.Get("CooldownProximityPrompt").SendToPlayer(player, pp);
		PlayerWarpingModule.warpPlayer(player, warpId);
	});
	pp.Parent = part;
}