const match = require('./match');

class OverridesScreen {
    constructor(language) {
        this.language = language;
    }
    /**
     * @example await overrides.Open();
     */
    async Open() {
        try {
            //assume we are starting from the open screen
            await match.accessible.Button(this.language.overridesScreen.WorkoutTargets).tap();
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
        return match.accessible.Header(this.language.overridesScreen.CustomPreset);
    }
    CancelHeaderButton() {
        return match.accessible.ButtonBarButton(this.language.general.Cancel);
    }
    EditHeaderButton() {
        return match.accessible.ButtonBarButton(this.language.general.Edit);
    }
    AddHeaderButton() {
        return match.accessible.ButtonBarButton(this.language.general.Add);
    }
    AddPresetMessage() {
        return match.accessible.Label(this.language.overridesScreen.AddPresetMessage);
    }
}

module.exports = { OverridesScreen };
