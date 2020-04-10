const match = require('./match');
const text = require('./text');

class OverridesScreen {
    /**
     * @example await overrides.Open();
     */
    async Open() {
        try {
            //assume we are starting from the open screen
            await match.accessible.Button(text.overridesScreen.WorkoutTargets).tap();
        } catch (err) { } //catch and continue
    }
    /**
     * @example await overrides.Cancel();
     */
    async Cancel() {
        await this.CancelHeaderButton().tap();
    }
    /**
     * @example await overrides.Add();
     */
    async Add() {
        await this.AddHeaderButton().tap();
    }
    /**
     * @example await overrides.Edit();
     */
    async Edit() {
        await this.EditHeaderButton().tap();
    }
    CustomPresetHeader() {
        return match.accessible.Header(text.overridesScreen.CustomPreset);
    }
    CancelHeaderButton() {
        return match.accessible.ButtonBarButton(text.general.Cancel);
    }
    EditHeaderButton() {
        return match.accessible.ButtonBarButton(text.general.Edit);
    }
    AddHeaderButton() {
        return match.accessible.ButtonBarButton(text.general.Add);
    }
    AddPresetMessage() {
        return match.accessible.Label(text.overridesScreen.AddPresetMessage);
    }
}

module.exports = { OverridesScreen };
