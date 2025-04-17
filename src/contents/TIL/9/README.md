# [C#] 직렬화, 역직렬화 feat. JSON
오늘은 Text RPG 게임의 세이브/로드 기능을 구현하면서 직렬화와 역직렬화에 대해 글을 작성해보겠습니다.

<br>

## 직렬화/역직렬화, JSON
게임의 진행 상태나 플레이어의 정보를 저장하고 불러오는 방법은 여러가지가 있겠지만, 대중적이면서 읽기, 쓰기가 간편한 JSON을 사용하여 데이터를 직렬화해 저장한 후 역직렬화해 불러오는 방법을 사용하겠습니다.   

직렬화? 역직렬화? 뭔가 어려운 내용인 것 같지만, 매우 간단한 내용입니다.
우선 직렬화와 역직렬화가 무엇인지 알아보겠습니다.

<br>

### 직렬화(Serialization)란?
> serialization은 지속시키거나 전송할 수 있는 형태로 개체 상태를 변환하는 프로세스입니다. serialization과 짝을 이루는 것은 스트림을 개체로 변환하는 deserialization입니다. 이 프로세스를 함께 사용하여 데이터를 쉽게 저장하고 전송할 수 있습니다.
>> .NET의 Serialization (Microsoft)

복잡하게 설명해놓았지만 한마디로 표현하면 **객체(데이터)를 저장하거나 통신할 수 있도록 변환시키는 것**입니다.   
데이터를 직렬화할때는 대표적으로 아래와 같은 포맷을 사용합니다.
- JSON
- XML
- CSV
- Byte

이론적으로는 다른 포맷도 사용이 가능하지만, 웬만하면 관련 자료나 라이브러리가 많은 위 4개의 형식 중 하나를 쓰는 것을 권장합니다.

<br>

### 역직렬화(Deserialization)란?
말 그대로 직렬화의 반대, 직렬화된 데이터를 다시 메모리가 읽거나 쓸 수 있도록 역으로 변환하는 것입니다.

<br>

## 데이터 저장 / 불러오기
서론이 길었습니다. 이제 본격적으로 세이브/로드 기능을 구현해보겠습니다.   
먼저 플레이어의 정보를 담는 ```PlayerContext```클래스를 만든 후, 플레이어 관련 변수들을 옮겨주었습니다.

```cs
// PlayerContext.cs
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace TextRPG
{
    [Serializable] // 직렬화 할 클래스라는 것을 명시
    class PlayerContext
    {
        private static JsonSerializerSettings serializerSettings;

        public int Exp;
        public int Level;
        public string Name;
        public Job Job;
        public Dictionary<string, (float basic, float bonus)> Stats;
        
        public int MaxHp;
        public int Hp;
        public long Gold;
        public bool IsDead;

        public Inventory Inventory;
        public Dictionary<EquipmentType, Item> EquippedItems;

        public PlayerContext()
        {
            serializerSettings = new JsonSerializerSettings();
            serializerSettings.Converters.Add(new StringEnumConverter()); // Enum을 string형태로 직렬화하겠다는 뜻
        }

        public void Initialize(string name)
        {
            Level = 1;
            Name = name;
            Stats = new Dictionary<string, (float basic, float bonus)>
            {
                { "Atk", (10f, 0) },
                { "Def", (5f, 0) }
            };
            MaxHp = 100;
            Hp = MaxHp;
            Job = Job.Warrior;
            Gold = 1500L;
            Inventory = new Inventory();
            EquippedItems = new Dictionary<EquipmentType, Item>
            {
                { EquipmentType.Hand, null },
                { EquipmentType.Head, null },
                { EquipmentType.Body, null },
                { EquipmentType.Legs, null },
                { EquipmentType.Foots, null },
                { EquipmentType.Item, null }
            };
            IsDead = false;
        }

        public void Save()
        {
            try
            {
                string json = JsonConvert.SerializeObject(this, Formatting.Indented, serializerSettings); // PlayerContext 클래스를 직렬화
                File.WriteAllText("player.json", json); // 직렬화된 정보를 파일로 저장

                Console.WriteLine("플레이어 정보가 저장되었습니다.");
            }
            catch (Exception e)
            {
                Console.WriteLine("플레이어 정보 저장에 실패했습니다.");
                Console.WriteLine(e);
            }
        }

        public static PlayerContext Load()
        {
            PlayerContext data = null;
            try
            {
                if (!File.Exists("player.json"))
                {
                    return null;
                }

                string json = File.ReadAllText("player.json"); // 파일 불러오기
                data = JsonConvert.DeserializeObject<PlayerContext>(json, serializerSettings); // 불러온 파일 역직렬화

                Console.WriteLine("플레이어 정보를 불러왔습니다.");
            }
            catch (Exception e)
            {
                Console.WriteLine("플레이어 정보 로딩에 실패했습니다.");
                Console.WriteLine(e);
            }

            return data;
        }
    }
}
```

데이터를 직렬화, 역직렬화하기 위해 ```Newtonsoft.Json```라이브러리를 사용했습니다. JSON파일을 직렬화, 역직렬화하기 위해 사용하는 가장 인기있는 C# 라이브러리입니다.   
플레이어의 정보는 아래와 같은 형태로 저장됩니다.

```json
// player.json
{
  "Exp": 0,
  "Level": 7,
  "Name": "JIMIN",
  "Job": "Warrior",
  "Stats": {
    "Atk": {
      "Item1": 13.0,
      "Item2": 17.0
    },
    "Def": {
      "Item1": 11.0,
      "Item2": 1.0
    }
  },
  "MaxHp": 100,
  "Hp": 77,
  "Gold": 13398,
  "IsDead": false,
  "Inventory": {
    "Items": [
      {
        "Id": "bbbf6860-a12c-4566-9523-39e0f28525ac",
        "Name": "수련자 갑옷",
        "Desc": "수련에 도움을 주는 갑옷입니다.",
        "ItemEffectDict": {
          "Def": 5.0
        },
        "EquipmentType": "Body",
        "IsEquipped": true,
        "Price": 1000
      },
      {
        "Id": "b72c2fa5-ddaa-4b37-a8c4-fb63198cf452",
        "Name": "스파르타의 창",
        "Desc": "스파르타의 전사들이 사용했다는 전설의 창입니다.",
        "ItemEffectDict": {
          "Atk": 7.0
        },
        "EquipmentType": "Hand",
        "IsEquipped": true,
        "Price": 3500
      },
      {
        "Id": "76587f18-f83e-4213-ae32-67ec9d2c9cef",
        "Name": "공격력 주문서",
        "Desc": "장착 시 공격력이 증가하지만, 방어력이 감소합니다.",
        "ItemEffectDict": {
          "Atk": 10.0,
          "Def": -4.0
        },
        "EquipmentType": "Item",
        "IsEquipped": true,
        "Price": 2000
      }
    ]
  },
  "EquippedItems": {
    "Hand": {
      "Id": "b72c2fa5-ddaa-4b37-a8c4-fb63198cf452",
      "Name": "스파르타의 창",
      "Desc": "스파르타의 전사들이 사용했다는 전설의 창입니다.",
      "ItemEffectDict": {
        "Atk": 7.0
      },
      "EquipmentType": "Hand",
      "IsEquipped": true,
      "Price": 3500
    },
    "Head": null,
    "Body": {
      "Id": "bbbf6860-a12c-4566-9523-39e0f28525ac",
      "Name": "수련자 갑옷",
      "Desc": "수련에 도움을 주는 갑옷입니다.",
      "ItemEffectDict": {
        "Def": 5.0
      },
      "EquipmentType": "Body",
      "IsEquipped": true,
      "Price": 1000
    },
    "Legs": null,
    "Foots": null,
    "Item": {
      "Id": "76587f18-f83e-4213-ae32-67ec9d2c9cef",
      "Name": "공격력 주문서",
      "Desc": "장착 시 공격력이 증가하지만, 방어력이 감소합니다.",
      "ItemEffectDict": {
        "Atk": 10.0,
        "Def": -4.0
      },
      "EquipmentType": "Item",
      "IsEquipped": true,
      "Price": 2000
    }
  }
}
```

<br>

## 마무리
```Newtonsoft.JSON```라이브러리를 사용하여 매우 쉽고 간단하게 데이터 저장, 불러오기 기능을 구현했습니다. 추후에 이진 형식으로도 데이터를 직렬화하여 빠르게 데이터를 전달하는 기능도 구현해보는 시간을 가져보면 좋을 것 같습니다.

<br>

## 참고 자료
[.NET의 Serialization](https://learn.microsoft.com/ko-kr/dotnet/standard/serialization/)
<br>
[Json.NET Documentation](https://www.newtonsoft.com/json/help/html/Introduction.htm)
