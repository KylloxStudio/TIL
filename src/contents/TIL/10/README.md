# 2025-04-21
오늘은 추상 클래스를 활용한 TextRPG게임의 몬스터를 만들어보겠습니다.

## 추상 클래스
```cs
// Monster.cs
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _8LETTE_TextRPG
{
    public abstract class Monster
    {
        public enum State
        {
            Invalid = -1,
            Idle,
            Attack,
            Dead
        }

        public string? Name { get; protected set; }
        public int Level { get; protected set; }
        public float MaxHp { get; protected set; }
        private float _hp;
        public float Hp
        {
            get
            {
                return _hp;
            }
            set
            {
                if (value > MaxHp)
                {
                    _hp = MaxHp;
                }
                else if (value < 0)
                {
                    _hp = 0;
                    Death();
                }
                else
                {
                    _hp = value;
                }
            }
        }
        public float Defense { get; protected set; }
        public float Attack { get; protected set; }
        public bool IsDead => CurState == State.Dead;

        protected State CurState
        {
            get
            {
                return _curState;
            }
            set
            {
                TransitionTo(value);
            }
        }

        protected State InvalidState => State.Invalid;

        private State _curState;
        private State _prevState;

        private readonly Dictionary<State, StateElem> _states = [];

        protected class StateElem
        {
            public Action? Entered;
            public Action? Doing;
            public Action? Exited;
        }

        public Monster()
        {
            DefineStates();
        }

        protected abstract void DefineStates();

        protected void TransitionTo(State nextState)
        {
            _prevState = _curState;
            _curState = nextState;
            if (_prevState != InvalidState)
            {
                if (_states.TryGetValue(_prevState, out StateElem? stateElem))
                {
                    if (stateElem != null && stateElem.Exited != null)
                    {
                        stateElem.Exited();
                    }
                }
            }

            if (_curState != InvalidState)
            {
                if (_states.TryGetValue(_curState, out StateElem? stateElem))
                {
                    if (stateElem != null)
                    {
                        stateElem.Entered?.Invoke();
                        stateElem.Doing?.Invoke();
                    }
                }
            }
        }

        protected void AddState(State state, StateElem stateElem)
        {
            _states.Add(state, stateElem);
        }

        public virtual void OnDamaged(float dmg)
        {
            Hp -= dmg;
        }

        public virtual void AttackTo(Player victim)
        {
            Random r = new Random();
            float varirance = (float)Math.Ceiling(Attack * 0.1f);

            //Todo : 방어력에 따른 데미지 감소 로직
            float damage = Attack + r.Next(-(int)varirance, (int)varirance);
            damage = Math.Max(1, damage);

            victim.OnDamaged(damage);
        }

        protected virtual void Death()
        {
            CurState = State.Dead;
        }
    }
}
```
먼저, 추상 클래스 Monster를 만들었습니다. 이 클래스를 통해 다른 클래스에서도 공통적인 로직을 사용할 수 있습니다.

```cs
// InfLoop.cs
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace _8LETTE_TextRPG
{
    class InfLoop : Monster
    {
        public InfLoop()
        {
            Name = "무한루프";
            Level = 3;
            MaxHp = 20f;
            Hp = MaxHp;
            Attack = 10f;
            Defense = 5f;
        }

        protected override void DefineStates()
        {
            AddState(State.Idle, new StateElem
            {
                Doing = new Action(OnIdle)
            });

            AddState(State.Attack, new StateElem
            {
                Entered = new Action(AttackEntered),
                Doing = new Action(AttackDoing),
                Exited = new Action(AttackExited)
            });

            AddState(State.Dead, new StateElem
            {
                Doing = new Action(OnDeath)
            });
        }

        private void OnIdle()
        {

        }

        private void AttackEntered()
        {

        }

        private void AttackDoing()
        {

        }

        private void AttackExited()
        {

        }

        private void OnDeath()
        {

        }

        public override void OnDamaged(float dmg)
        {
            base.OnDamaged(dmg);
        }

        public override void AttackTo(Player victim)
        {
            base.AttackTo(victim);
        }
    }
}
```