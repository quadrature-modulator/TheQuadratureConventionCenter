import Remotes from "shared/Remotes";

Remotes.Client.Get("CooldownProximityPrompt").Connect(pp => { pp.Enabled = false; task.delay(2, () => { pp.Enabled = true; }); });