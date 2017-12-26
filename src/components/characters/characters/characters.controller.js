export default class controller {
  constructor($log) {
    'ngInject';
    
    Object.assign(this, { $log });

    var vm = this;

    var boendal = {
      name: 'Boendal',
      baseAttack: 11,
      attacks: [
        { name: 'greatsword', type: 'melee', attackMod: 9, damageDice: '3d6', damageMod: 12, largeDamageDice: '4d6', largeDamageMod: 14},
        { name: 'longspear', type: 'melee', attackMod: 8, damageDice: '2d6', damageMod: 11, largeDamageDice: '3d6', largeDamageMod: 13},
        { name: 'longbow', type: 'ranged', attackMod: 4, damageDice: '1d8', damageMod: 8, largeDamageMod: 9}
      ],
      bigUps: [
        { name: 'none', large: false},
        { name: 'enlarge', large: true},
        { name: 'soul stone', desc:'+1 BAB', large: true},
      ],
      optionalBonuses: [
        { name: 'haste', attackMod: 1, extraAttacks: 1, selected: false},
        { name: 'bane', attackMod: 2, damageMod: 2, damageDice: '2d6', selected: false},
        { name: 'power attack', type: 'melee',
          get attackMod() {
            return vm.getPowerAttackMod(boendal.baseAttack);
          },
          get damageMod() {
            return -3*(this.attackMod);
          },
          selected: true
        },
        { name: 'deadly aim', type: 'ranged',
          get attackMod() {
            return vm.getPowerAttackMod(boendal.baseAttack);
          },
          get damageMod() {
            return -2*(this.attackMod);
          },
          selected: false
        },
        { name: 'rapid shot', type: 'ranged', extraAttacks: 1, attackMod: -2, selected: false},
        { name: 'alcoholic morale', attackMod: 2, damageMod: 2, selected: false}
      ],
      conditionalBonuses: [
        { name: 'flanking', type: 'melee', attackMod: 4, selected: true},
        //{ name: 'adj to flanked enemy', type: 'melee', attackMod: 2, selected: false},
        { name: 'opp attack (circumstance)', type: 'melee', attackMod: 4, selected: false},
        { name: 'enemy is prone', type: 'melee', attackMod: 4, selected: false},
        { name: 'vs giant', attackMod: 6, damageMod: 4, selected: false},
        { name: 'vs orc', attackMod: 2, damageMod: 2, selected: false}
      ]
    };

    var bilo = {
      name: 'Bilo',
      baseAttack: 7,
      attacks: [
        { name: 'bite', type: 'melee', attackMod: 7, damageDice: '2d6', damageMod: 13, largeDamageDice: '3d6', largeDamageMod: 15,
          rider: { name: 'trip', type: 'melee', attackMod: 15, damageDice: '', damageMod: 0, perAttack: true}
        }
      ],
      bigUps: [
        { name: 'none', large: false}
      ],
      optionalBonuses: [
        { name: 'haste', attackMod: 1, extraAttacks: 1, selected: false},
        { name: 'power attack', type: 'melee',
          get attackMod() {
            return vm.getPowerAttackMod(bilo.baseAttack);
          },
          get damageMod() {
           return -3*(this.attackMod);
          },
          selected: false
        },
      ],
      conditionalBonuses: [
        { name: 'flanking', type: 'melee', attackMod: 4, selected: true},
        //{ name: 'adj to flanked enemy', type: 'melee', attackMod: 2, selected: false},
        { name: 'opp attack', type: 'melee', attackMod: 4, selected: false},
        { name: 'enemy is prone', type: 'melee', attackMod: 4, selected: false},
        { name: 'vs giant', attackMod: 4, damageMod: 4, selected: false},
        { name: 'vs orc', attackMod: 2, damageMod: 2, selected: false}
      ]
    };

    var mahmud = {
      name: 'Mahmud',
      baseAttack: 9,

      attacks: [
        { name: 'scimitar', type: 'melee', attackMod: 6, damageDice: '1d6', damageMod: 6},
        { name: 'scimitar-2h', type: 'melee', attackMod: 6, damageDice: '1d6', damageMod: 8},
        { name: 'claw (witchwyrd)', type: 'melee', attackMod: 5, damageDice: '1d4', damageMod: 5,
          get extraAttacks() {
            return mahmud.optionalBonuses.some(x => x.selected && x.name === 'spell combat')
              ? 2
              : 3;
          },
          isNatural: true
        },
        { name: 'scimitar (witchwyrd)', type: 'melee', attackMod: 6, damageDice: '1d6', damageMod: 6,
          get secondaryAttacks() {
            return mahmud.optionalBonuses.some(x => x.selected && x.name === 'spell combat')
              ? [ { name: 'claw (witchwyrd)', type: 'melee', attackMod: 0, damageDice: '1d4', damageMod: 5, isNatural: true},
                  { name: 'claw (witchwyrd)', type: 'melee', attackMod: 0, damageDice: '1d4', damageMod: 5, isNatural: true}
                ]
              : [ { name: 'claw (witchwyrd)', type: 'melee', attackMod: 0, damageDice: '1d4', damageMod: 5, isNatural: true},
                  { name: 'claw (witchwyrd)', type: 'melee', attackMod: 0, damageDice: '1d4', damageMod: 5, isNatural: true},
                  { name: 'claw (witchwyrd)', type: 'melee', attackMod: 0, damageDice: '1d4', damageMod: 5, isNatural: true}
                ]
          }
        },
        /*{ name: 'claw (deathsnatcher)', type: 'melee', attackMod: 5, damageDice: '1d8', damageMod: 5,
          get extraAttacks() {
            return mahmud.optionalBonuses.some(x => x.selected && x.name === 'spell combat')
              ? 2
              : 3;
          },
          isNatural: true,
          get secondaryAttacks() {
            return mahmud.optionalBonuses.some(x => x.selected && x.name === 'spell combat')
              ? []
              : [{ name: 'bite', type: 'melee', attackMod: 6, damageDice: '2d6', damageMod: 6, isNatural: true, attacks: 1},
                 { name: 'sting', type: 'melee', attackMod: 6, damageDice: '1d6', damageMod: 6, isNatural: true, attacks: 1}]
          }
        },*/
        /*{ name: 'claw (calikang)', type: 'melee', attackMod: 5, damageDice: '1d6', damageMod: 5,
          get extraAttacks() {
            return mahmud.optionalBonuses.some(x => x.selected && x.name === 'spell combat')
              ? 4
              : 5;
          },
          isNatural: true
        },
        { name: 'scimitar (calikang)', type: 'melee', attackMod: 6, damageDice: '1d6', damageMod: 6,
          get secondaryAttacks() {
            return mahmud.optionalBonuses.some(x => x.selected && x.name === 'spell combat')
              ? [ { name: 'claw (calikang)', type: 'melee', attackMod: 0, damageDice: '1d6', damageMod: 5, isNatural: true},
                  { name: 'claw (calikang)', type: 'melee', attackMod: 0, damageDice: '1d6', damageMod: 5, isNatural: true},
                  { name: 'claw (calikang)', type: 'melee', attackMod: 0, damageDice: '1d6', damageMod: 5, isNatural: true},
                  { name: 'claw (calikang)', type: 'melee', attackMod: 0, damageDice: '1d6', damageMod: 5, isNatural: true}
                ]
              : [ { name: 'claw (calikang)', type: 'melee', attackMod: 0, damageDice: '1d6', damageMod: 5, isNatural: true},
                  { name: 'claw (calikang)', type: 'melee', attackMod: 0, damageDice: '1d6', damageMod: 5, isNatural: true},
                  { name: 'claw (calikang)', type: 'melee', attackMod: 0, damageDice: '1d6', damageMod: 5, isNatural: true},
                  { name: 'claw (calikang)', type: 'melee', attackMod: 0, damageDice: '1d6', damageMod: 5, isNatural: true},
                  { name: 'claw (calikang)', type: 'melee', attackMod: 0, damageDice: '1d6', damageMod: 5, isNatural: true}
                ]
          }
        },*/
      ],
      bigUps: [
        { name: 'none', large: false}
      ],
      optionalBonuses: [
        { name: 'haste', attackMod: 1, extraAttacks: 1, selected: false},
        { name: 'frostbite', damageDice: '1d6+9', selected: false},
        { name: 'monstrous physique', attackMod: 1, damageMod: 1, selected: false},
        { name: 'spell combat', attackMod: -2, selected: true},
        { name: '+spell strike', extraAttacks: 1, selected: true},
        { name: 'arcane accuracy', attackMod: 5, selected: false},
        { name: 'concealment', attackMod: 2, damageMod: 2, selected: false}
      ],
      conditionalBonuses: [
        { name: 'flanking', type: 'melee', attackMod: 2, selected: false},
        { name: '+outflank', type: 'melee', attackMod: 2, selected: false},
        { name: 'vs gnolls (competence)', attackMod: 2, damageMod: 2, selected: false}
      ]
    };

    this.characters = [boendal, bilo, mahmud];
  }

  getPowerAttackMod(baseAttack) {
    return -1*(1 + Math.floor(baseAttack / 4));
  }
}
