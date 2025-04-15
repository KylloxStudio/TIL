# C# 콘솔 Text RPG 만들기
오늘은 C#으로 간단한 Text기반 RPG 게임을 만들어보겠습니다.   
1일차엔 메인 화면, 상태창, 인벤토리까지만 구현해보겠습니다.


### 1. 메인 화면
C# Empty Project를 생성한 후 Game.cs파일을 만들어 줍니다. 이 파일에 메인 화면의 소스코드를 담겠습니다.

```cs
// Game.cs
using System;

namespace TextRPG
{
    class Game
    {
        public static PlayerStats PlayerStats { get; private set; }
        public static Inventory Inventory { get; private set; }

        static void Main(string[] args)
        {
            PlayerStats = new PlayerStats();
            Inventory = new Inventory();
            Inventory.AddItem("asd", "asfsdgg", ItemBuff.Atk, 7);
            Inventory.AddItem("asdggg", "asfsdgg324trsdfg", ItemBuff.Def, 9);

            Console.Write("스파르타 마을에 오신 여러분 환영합니다.\r\n원하시는 이름을 설정해주세요.\r\n>> ");
            PlayerStats.Initialize(Console.ReadLine());

            while (true)
            {
                Console.WriteLine("\r\n스파르타 마을");
                Console.Write("이곳에서 던전으로 들어가기전 활동을 할 수 있습니다.\r\n\r\n1. 상태 보기\r\n2. 인벤토리\r\n3. 상점\r\n\r\n원하시는 행동을 입력해주세요.\r\n>> ");

                bool isValidChoice;
                string choice = Console.ReadLine();
                switch (choice)
                {
                    case "1":
                        PlayerStats.PrintInfo();
                        isValidChoice = true;
                        break;
                    case "2":
                        Inventory.ShowInventory();
                        isValidChoice = true;
                        break;
                    default:
                        isValidChoice = false;
                        break;
                }

                if (!isValidChoice)
                {
                    Console.WriteLine("잘못된 입력입니다.");
                }
            }
        }
    }
}
```

<br>

### 2. 플레이어 상태창
```cs
// PlayerStats.cs
using System;
using System.Collections.Generic;

namespace TextRPG
{
    class PlayerStats
    {
        public int Level { get; set; }
        public string Name { get; private set; }
        public Job Job { get; private set; }
        public Dictionary<string, (int basic, int bonus)> Stats { get; private set; }
        public int Atk
        {
            get
            {
                return Stats["Atk"].basic + Stats["Atk"].bonus;
            }
        }
        public int Def
        {
            get
            {
                return Stats["Def"].basic + Stats["Def"].bonus;
            }
        }
        public int Hp
        {
            get
            {
                return Stats["Hp"].basic + Stats["Hp"].bonus;
            }
        }
        public int Gold { get; set; }

        public void Initialize(string name)
        {
            Level = 1;
            Name = name;
            Stats = new Dictionary<string, (int basic, int bonus)>
            {
                { "Atk", (10, 0) },
                { "Def", (5, 0) },
                { "Hp", (100, 0) }
            };
            Job = Job.Chad;
            Gold = 1500;
        }

        public string GetJobName()
        {
            switch (Job)
            {
                case Job.Chad:
                    return "전사";
                default:
                    return "알 수 없음";
            }
        }

        public void PrintInfo()
        {
            Console.WriteLine("\r\n상태 보기\r\n캐릭터의 정보가 표시됩니다.\r\n");

            Console.WriteLine("Lv. {0:D2}", Level);
            Console.WriteLine("이름: {0}", Name);
            Console.WriteLine("직업: {0}", GetJobName());
            Console.WriteLine("공격력: {0} (+{1})", Atk, Stats["Atk"].bonus);
            Console.WriteLine("방어력: {0} (+{1})", Def, Stats["Def"].bonus);
            Console.WriteLine("체력: {0} (+{1})", Hp, Stats["Hp"].bonus);
            Console.WriteLine("Gold: {0}", Gold);

            Console.Write("\r\n0. 나가기\r\n\r\n원하시는 행동을 입력해주세요.\r\n>> ");
            while (true)
            {
                string choice = Console.ReadLine();
                if (choice == "0")
                {
                    break;
                }
                else
                {
                    Console.WriteLine("잘못된 입력입니다.");
                }
            }
        }
    }
}
```

```cs
// Job.cs
namespace TextRPG
{
    enum Job
    {
        Chad
    }
}
```

<br>

### 3. 인벤토리, 아이템
```cs
// Inventory.cs
using System;
using System.Collections.Generic;

namespace TextRPG
{
    class Inventory
    {
        private List<Item> items = new List<Item>();

        public void AddItem(Item item)
        {
            items.Add(item);
        }

        public void AddItem(string name, string desc, ItemBuff buff, int increase)
        {
            Item item = new Item();
            item.Name = name;
            item.Desc = desc;
            item.ItemBuffDict[buff] = increase;

            items.Add(item);
        }

        public void ShowInventory()
        {
            Console.WriteLine("\r\n인벤토리\r\n보유 중인 아이템을 관리할 수 있습니다.\r\n");

            Console.WriteLine("[아이템 목록]");
            foreach (Item item in items)
            {
                Console.Write("- ");
                if (item.IsEquipped)
                {
                    Console.Write("[E]");
                }

                Console.WriteLine($"{item.Name, -10} | {item.GetBuff(), 5} | {item.Desc, 5}");
            }

            Console.Write("\r\n1. 장착 관리\r\n2. 나가기\r\n\r\n원하시는 행동을 입력해주세요.\r\n>> ");
            while (true)
            {
                bool isValidChoice;
                string choice = Console.ReadLine();
                switch (choice)
                {
                    case "1":
                        ShowEquipment();
                        isValidChoice = true;
                        break;
                    case "2":
                        isValidChoice = true;
                        break;
                    default:
                        isValidChoice = false;
                        break;
                }

                if (isValidChoice)
                {
                    break;
                }
                else
                {
                    Console.WriteLine("잘못된 입력입니다.");
                }
            }
        }

        public void ShowEquipment()
        {
            Console.WriteLine("\r\n인벤토리 - 장착 관리\r\n보유 중인 아이템을 관리할 수 있습니다.\r\n");

            Console.WriteLine("[아이템 목록]");
            for (int i = 0; i < items.Count; i++)
            {
                Console.Write("- {0} ", i + 1);
                if (items[i].IsEquipped)
                {
                    Console.Write("[E]");
                }

                Console.WriteLine($"{items[i].Name, -10} | {items[i].GetBuff(), 5} | {items[i].Desc, 5}");
            }

            Console.Write("\r\n0. 나가기\r\n\r\n원하시는 행동을 입력해주세요.\r\n>> ");
            while (true)
            {
                if (int.TryParse(Console.ReadLine(), out int choice))
                {
                    if (choice < 0 || choice > items.Count)
                    {
                        Console.WriteLine("잘못된 입력입니다.");
                        continue;
                    }

                    if (choice == 0)
                    {
                        break;
                    }

                    Item item = items[choice - 1];
                    if (!item.IsEquipped)
                    {
                        item.Equip();
                    }
                    else
                    {
                        item.UnEquip();
                    }

                    break;
                }
                else
                {
                    Console.WriteLine("잘못된 입력입니다.");
                }
            }
        }
    }
}
```

```cs
// Item.cs
using System;
using System.Collections.Generic;

namespace TextRPG
{
    class Item
    {
        public string Name { get; set; }
        public string Desc { get; set; }
        public Dictionary<ItemBuff, int> ItemBuffDict { get; private set; }
        public bool IsEquipped { get; private set; }

        public Item()
        {
            ItemBuffDict = new Dictionary<ItemBuff, int>
            {
                { ItemBuff.Atk, 0 },
                { ItemBuff.Def, 0 },
                { ItemBuff.Hp, 0 }
            };
        }

        public string GetBuff()
        {
            foreach (KeyValuePair<ItemBuff, int> buffPair in ItemBuffDict)
            {
                if (buffPair.Value != 0)
                {
                    switch (buffPair.Key)
                    {
                        case ItemBuff.Atk:
                            return "공격력 +" + buffPair.Value;
                        case ItemBuff.Def:
                            return "방어력 +" + buffPair.Value;
                        case ItemBuff.Hp:
                            return "체력 +" + buffPair.Value;
                        default:
                            return "알 수 없음 +" + buffPair.Value;
                    }
                }
            }
            
            return "";
        }

        public void Equip()
        {
            IsEquipped = true;

            foreach (KeyValuePair<ItemBuff, int> buffPair in ItemBuffDict)
            {
                switch (buffPair.Key)
                {
                    case ItemBuff.Atk:
                        Game.PlayerStats.Stats["Atk"] = (Game.PlayerStats.Stats["Atk"].basic, Game.PlayerStats.Stats["Atk"].bonus + buffPair.Value);
                        break;
                    case ItemBuff.Def:
                        Game.PlayerStats.Stats["Def"] = (Game.PlayerStats.Stats["Def"].basic, Game.PlayerStats.Stats["Def"].bonus + buffPair.Value);
                        break;
                    case ItemBuff.Hp:
                        Game.PlayerStats.Stats["Hp"] = (Game.PlayerStats.Stats["Hp"].basic, Game.PlayerStats.Stats["Hp"].bonus + buffPair.Value);
                        break;
                    default:
                        break;
                }
            }

            Console.WriteLine("{0}(이)가 장착되었습니다.", Name);
        }

        public void UnEquip()
        {
            IsEquipped = false;

            foreach (KeyValuePair<ItemBuff, int> buffPair in ItemBuffDict)
            {
                switch (buffPair.Key)
                {
                    case ItemBuff.Atk:
                        Game.PlayerStats.Stats["Atk"] = (Game.PlayerStats.Stats["Atk"].basic, Game.PlayerStats.Stats["Atk"].bonus - buffPair.Value);
                        break;
                    case ItemBuff.Def:
                        Game.PlayerStats.Stats["Def"] = (Game.PlayerStats.Stats["Def"].basic, Game.PlayerStats.Stats["Def"].bonus - buffPair.Value);
                        break;
                    case ItemBuff.Hp:
                        Game.PlayerStats.Stats["Hp"] = (Game.PlayerStats.Stats["Hp"].basic, Game.PlayerStats.Stats["Hp"].bonus - buffPair.Value);
                        break;
                    default:
                        break;
                }
            }

            Console.WriteLine("{0}(이)가 장착 해제되었습니다.", Name);
        }
    }

    enum ItemBuff
    {
        Atk,
        Def,
        Hp
    }
}
```

<br>

### 실행 결과
```
스파르타 마을에 오신 여러분 환영합니다.
원하시는 이름을 설정해주세요.
>> JIMIN

스파르타 마을
이곳에서 던전으로 들어가기전 활동을 할 수 있습니다.

1. 상태 보기
2. 인벤토리
3. 상점

원하시는 행동을 입력해주세요.
>> 1

상태 보기
캐릭터의 정보가 표시됩니다.

Lv. 01
이름: JIMIN
직업: 전사
공격력: 10 (+0)
방어력: 5 (+0)
체력: 100 (+0)
Gold: 1500

0. 나가기

원하시는 행동을 입력해주세요.
>> 0

스파르타 마을
이곳에서 던전으로 들어가기전 활동을 할 수 있습니다.

1. 상태 보기
2. 인벤토리
3. 상점

원하시는 행동을 입력해주세요.
>> 2

인벤토리
보유 중인 아이템을 관리할 수 있습니다.

[아이템 목록]
- asd        | 공격력 +7 | asfsdgg
- asdggg     | 방어력 +9 | asfsdgg324trsdfg

1. 장착 관리
2. 나가기

원하시는 행동을 입력해주세요.
>> 1

인벤토리 - 장착 관리
보유 중인 아이템을 관리할 수 있습니다.

[아이템 목록]
- 1 asd        | 공격력 +7 | asfsdgg
- 2 asdggg     | 방어력 +9 | asfsdgg324trsdfg

0. 나가기

원하시는 행동을 입력해주세요.
>> 1
asd(이)가 장착되었습니다.

스파르타 마을
이곳에서 던전으로 들어가기전 활동을 할 수 있습니다.

1. 상태 보기
2. 인벤토리
3. 상점

원하시는 행동을 입력해주세요.
>> 1

상태 보기
캐릭터의 정보가 표시됩니다.

Lv. 01
이름: JIMIN
직업: 전사
공격력: 17 (+7)
방어력: 5 (+0)
체력: 100 (+0)
Gold: 1500

0. 나가기

원하시는 행동을 입력해주세요.
>> 0

스파르타 마을
이곳에서 던전으로 들어가기전 활동을 할 수 있습니다.

1. 상태 보기
2. 인벤토리
3. 상점

원하시는 행동을 입력해주세요.
>> 2

인벤토리
보유 중인 아이템을 관리할 수 있습니다.

[아이템 목록]
- [E]asd        | 공격력 +7 | asfsdgg
- asdggg     | 방어력 +9 | asfsdgg324trsdfg

1. 장착 관리
2. 나가기

원하시는 행동을 입력해주세요.
>> 1

인벤토리 - 장착 관리
보유 중인 아이템을 관리할 수 있습니다.

[아이템 목록]
- 1 [E]asd        | 공격력 +7 | asfsdgg
- 2 asdggg     | 방어력 +9 | asfsdgg324trsdfg

0. 나가기

원하시는 행동을 입력해주세요.
>> 1
asd(이)가 장착 해제되었습니다.

스파르타 마을
이곳에서 던전으로 들어가기전 활동을 할 수 있습니다.

1. 상태 보기
2. 인벤토리
3. 상점

원하시는 행동을 입력해주세요.
>> 1

상태 보기
캐릭터의 정보가 표시됩니다.

Lv. 01
이름: JIMIN
직업: 전사
공격력: 10 (+0)
방어력: 5 (+0)
체력: 100 (+0)
Gold: 1500

0. 나가기

원하시는 행동을 입력해주세요.
>> 
```

<br>

#### ToDo
- 아이템 장착 시 줄 정렬 틀어지는 문제 수정
- 상점 구현
- 휴식 기능 추가 (500G -> 체력 회복)
- 아이템 판매 기능 추가
- 아이템 타입 별로 하나의 아이템만 장착 가능하도록 개선
- 던전 구현
- 레벨업 구현
- 게임 저장 구현
