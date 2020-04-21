const { SettingsScreen } = require('./settingsScreen');
const { CarbEntryScreen } = require('./carbEntryScreen');
const { BolusScreen } = require('./bolusScreen');
const { HomeScreen } = require('./homeScreen');
const exec = require('child_process').exec;
const match = require('./match');
const text = require('./text');

class LoopTest {

    async _loadDeviceScenariosFromDisk(deviceId) {
        const _loadDeviceScenariosFromDiskShellScript = exec(`${__dirname}/../scripts/load_scenarios.sh ${deviceId}`);
        _loadDeviceScenariosFromDiskShellScript.stdout.on('data', () => {
            return null;
        });
        _loadDeviceScenariosFromDiskShellScript.stderr.on('data', (data) => {
            throw Error(data);
        });
    }

    async _loadScenario(scenarioName) {
        await device.shake();
        await expect(match.accessible.Label(scenarioName)).toExist();
        await match.accessible.Label(scenarioName).tap();
        await match.accessible.ButtonBarButton('Load').tap();
    }

    async _setStartScreen(start) {
        switch (start) {
            case ScreenName.settings:
                break;
            case ScreenName.home:
                await this.settingsScreen.Close();
                break;
            case ScreenName.bolus:
                await this.settingsScreen.Close();
                await this.bolusScreen.Open();
                break;
            case ScreenName.carbEntry:
                await this.settingsScreen.Close();
                await this.carbEntryScreen.Open();
                break;
            default:
                await this.settingsScreen.Close();
                break;
        }
    }

    _filterSettings(values, types) {
        const filtered = values;
        if (types) {
            for (const type of types) {
                delete filtered[type];
            }
        }
        return filtered;
    }

    constructor(build) {
        return (async () => {
            await device.launchApp({
                newInstance: true,
                permissions: { notifications: 'YES', health: 'YES' },
            });

            //TODO: nothing done with `target` or `language` yet
            this.target = build.target;
            this.language = build.language || text;

            this.units = build.units;

            this.scenario = build.scenario;
            this.startScreen = build.startScreen;
            this.settings = build.settings;
            this.simulators = build.simulators;

            this.settingsScreen = new SettingsScreen(this.language);
            this.homeScreen = new HomeScreen(this.language);
            this.bolusScreen = new BolusScreen(this.language);
            this.carbEntryScreen = new CarbEntryScreen(this.language);

            if (this.scenario) {
                await _loadDeviceScenariosFromDisk(device.deviceId);
                await _loadScenario(this.scenario);
                if (this.settings) {
                    this.settings = this._filterSettings(this.settings, [SettingType.CGMSimulatorSettings, SettingType.AddCGMSimulator, SettingType.AddPumpSimulator]);
                }
            }

            if (this.settings) {
                await this.settingsScreen.Open();

                if (this.filter) {
                    this.settings = this._filterSettings(this.settings, this.filter)
                }

                await this.settingsScreen.Apply(this.settings);
            } else if (this.simulators) {
                await settingsScreen.Open();
                if (this.simulators.cgm) {
                    await settingsScreen.AddCGMSimulator();
                }
                if (this.simulators.pump) {
                    await settingsScreen.AddPumpSimulator();
                }
            }

            if (this.startScreen) {
                await _setStartScreen(this.startScreen);
            }
            return this;
        })();

    }

    async removeData() {
        await this.settingsScreen.Open();
        await this.settingsScreen.RemoveCGMData();
        await this.settingsScreen.RemovePumpData();
        await this.settingsScreen.Close();
    }

    async advanceScenario(cycles) {
        await device.shake();
        await expect(match.accessible.Label(this.scenario)).toExist();
        await match.accessible.Label(this.scenario).swipe('left');
        await match.accessible.SwipeButton('Advance ⏭').tap();
        await match.UITextField().typeText(cycles);
        await match.accessible.Button(text.general.OK).tap();
    }

    static get Builder() {
        class Builder {
            constructor(target) {
                this.target = target;
            }
            withLanguage(language) {
                this.language = language;
                return this;
            }
            withScenario(scenario) {
                this.scenario = scenario;
                return this;
            }
            withStartScreen(startScreen) {
                this.startScreen = startScreen;
                return this;
            }
            withUnits(units) {
                this.units = units;
                return this;
            }
            withSettings(settings) {
                this.settings = settings;
                return this;
            }
            withSettingsFilter(filter) {
                this.filter = filter;
                return this;
            }
            withSimulators(simulators) {
                this.simulators = simulators;
            }
            async build() {
                return new LoopTest(this);
            }
        }
        return Builder;
    }
}

module.exports = {
    LoopTest
};
