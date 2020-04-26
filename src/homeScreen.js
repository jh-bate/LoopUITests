const match = require('./match');

class HomeScreen {
    constructor(language) {
        this.language = language;
    }
    /**
     * @example home.ActiveCarbohydratesLabel().tap();
     */
    ActiveCarbohydratesLabel() {
        return match.accessible.Label(this.language.homeScreen.ActiveCarbohydrates);
    }
    /**
     * @example home.ActiveInsulinLabel().tap();
     */
    ActiveInsulinLabel() {
        return match.accessible.Label(this.language.homeScreen.ActiveInsulin);
    }
    /**
     * @example home.InsulinDeliveryLabel().tap();
     */
    InsulinDeliveryLabel() {
        return match.accessible.Label(this.language.homeScreen.InsulinDelivery);
    }
    /**
     * @example home.GlucoseLabel().tap();
     */
    GlucoseLabel() {
        return match.accessible.Label(this.language.homeScreen.Glucose);
    }
    /**
     * @example home.SettingsButton().tap();
     */
    SettingsButton() {
        return match.accessible.Button(this.language.settingsScreen.Settings);
    }
    OverridesButton() {
        return match.accessible.Button(this.language.overridesScreen.WorkoutTargets);
    }
    AddMealButton() {
        return match.accessible.Button(this.language.carbEntryScreen.AddMeal);
    }
    BolusButton() {
        return match.accessible.Button(this.language.bolusScreen.Bolus);
    }
    async OpenActiveCarbohydratesChart() {
        await this.ActiveCarbohydratesLabel().tap();
    }
    async OpenActiveInsulinChart() {
        await this.ActiveInsulinLabel().tap();
    }
    async OpenInsulinDeliveryChart() {
        await this.InsulinDeliveryLabel().tap();
    }
    async OpenGlucoseChart() {
        await this.GlucoseLabel().tap();
    }
    async CloseChart() {
        await match.accessible.BackButton(this.language.general.Status).tap();
    }
    async ExpectLoopNotYetRun() {
        await expect(match.loop.Icon()).toHaveLabel(this.language.homeScreen.LoopWaitingForFirstRun);
    }
    async TapLoopIcon() {
        await match.loop.Icon().tap();
    }
    async ExpectLoopStatusCarbsAlert() {
        await this.TapLoopIcon();
        await expect(match.accessible.AlertLabel(this.language.alerts.MissingCarbEffects)).toExist();
        await match.accessible.Button(this.language.general.OK).tap();
    }
    async ExpectLoopStatusInsulinAlert() {
        await this.TapLoopIcon();
        await expect(match.accessible.AlertLabel(this.language.alerts.MissingInsulinEffects)).toExist();
        await match.accessible.Button(this.language.general.OK).tap();
    }
    async ExpectLoopStatusConfigurationAlert() {
        await this.TapLoopIcon();
        await expect(match.accessible.AlertLabel(this.language.alerts.ConfigurationError)).toExist();
        await match.accessible.Button(this.language.general.OK).tap();
    }
    async ExpectLoopStatusGlucoseDataAlert() {
        await this.TapLoopIcon();
        await expect(match.accessible.AlertLabel(this.language.alerts.MissingGlucoseData)).toExist();
        await match.accessible.Button(this.language.general.OK).tap();
    }
    async ExpectSuccessfulLoop() {
        await this.TapLoopIcon();
        await expect(match.accessible.Alert()).toNotExist();
    }
}

module.exports = { HomeScreen };
