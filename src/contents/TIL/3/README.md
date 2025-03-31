# 배열 요소의 최대값과 최소값 찾기

오늘은 숫자 배열에서의 최소값과 최대값을 구하는 문제를 학습해보겠습니다.   
문제: ```int[] numbers = { 10, 20, 30, 40, 50 };```와 같은 배열에서의 최소값, 최대값 구하기

```cs
using System;

namespace Project1
{
    class source
    {
        static void Main(string[] args)
        {
            int[] numbers = { 10, 20, 30, 40, 50 };
            int min = numbers[0];
            int max = numbers[0];
            for (int i = 0; i < numbers.Length; i++)
            {
                if (numbers[i] < min)
                {
                    min = numbers[i];
                }

                if (numbers[i] > max)
                {
                    max = numbers[i];
                }
            }

            Console.WriteLine("min: " + min);
            Console.WriteLine("max: " + max);
        }
    }
}
```

전체 코드는 위와 같습니다.   
   
먼저, 변수 min과 max를 선언합니다. 초기값은 배열의 첫번째 요소로 합니다.   
그 후에 배열 전체를 순회하며 각 요소와 변수 ```min```, ```max```의 크기를 비교합니다. 요소의 값이 ```min```보다 작으면 ```min```에 요소의 값을 넣고, 요소의 값이 ```max```보다 크다면 ```max```에 요소의 값을 넣습니다.
비교가 끝난 후 ```min```과 ```max```의 값을 출력합니다.
