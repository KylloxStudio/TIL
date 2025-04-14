# C# 간단한 입출력 프로그램 만들기
프로그램에서 입력과 출력은 가장 중요한 부분이라고 생각합니다.   
오늘은 여러 입출력 프로그램을 만들어보면서 기초를 다듬어보는 시간을 가져보겠습니다.

<br>

### 1. 사용자로부터 입력 받기
제일 먼저 이름과 나이를 입력 받고 출력하는 코드를 작성해보겠습니다.
```cs
using System;

namespace Project1
{
    class source
    {
        static void Main(string[] args)
        {
            Console.Write("이름을 입력해주세요: ");
            string name = Console.ReadLine();

            Console.Write("나이를 입력해주세요: ");
            string age = Console.ReadLine();

            Console.WriteLine($"이름: {name}, 나이: {age}");
        }
    }
}
```
이름과 나이를 입력받고 출력하기만 하는 매우 간단한 프로그램입니다. ```Console.ReadLine```을 활용하여 사용자로부터 입력을 받을 수 있습니다.   
나이를 정수형으로만 받고 싶다면 ```int.TryParse```와 ```if```문을 활용하여 예외사항을 처리할수도 있을 것 같습니다.

결과:
```
이름을 입력해주세요: JiMin
나이를 입력해주세요: 20
이름: JiMin, 나이: 20
```

<br>

### 2. 섭씨-화씨 변환기
이번엔 섭씨온도(°C)를 화씨온도(°F)로 변환하는 프로그램을 만들어보겠습니다. 1번과 같이 입력을 받고 변환 계산 작업만 해주면 될 것 같습니다.
```cs
using System;

namespace Project1
{
    class source
    {
        static void Main(string[] args)
        {
            while (true)
            {
                Console.Write("섭씨온도를 입력해주세요: ");
                if (float.TryParse(Console.ReadLine(), out float c))
                {
                    float f = c * 1.8f + 32f;
                    Console.WriteLine($"{c}°C -> {f}°F");
                }
                else
                {
                    Console.WriteLine("숫자만 입력 가능합니다.");
                }
            }
        }
    }
}
```
여러번 계산 할 수 있도록 무한 반복문을 사용하였고, 숫자만 입력받을 수 있도록 ```float.TryParse```를 사용해 예외처리를 하였습니다.   
섭씨온도를 화씨온도로 변환하기 위해선 **섭씨온도에 1.8을 곱한 후 32를 더하면 되므로** 간단한 연산로직을 추가해줍니다. 그 후 변환된 숫자를 출력하면 완성입니다.

결과:
```
섭씨온도를 입력해주세요: 36.5
36.5°C -> 97.7°F
```

<br>

### 마무리
오늘은 C#을 활용하여 간단한 입출력 프로그램을 만들어보았습니다.   
매우 간단한 프로그램이지만 기초를 다듬을 수 있는 시간이 되어 좋았습니다.