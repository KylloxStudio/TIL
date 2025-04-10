# 홀수 출력

오늘은 유니티 내일배움캠프 달리기반 Lv2를 완료해보겠습니다.   
C#의 반복문을 사용해 1부터 100까지의 홀수를 출력하는 프로그램을 작성하는 것입니다. 그럼 시작하겠습니다.

- 1부터 100까지의 숫자 중 홀수만 출력하기
  - 1. ```for```
  - 2. ```while```
  - 3. ```do-while```
   
### 1. for
첫 번째로, ```for```문을 사용해보겠습니다. 1부터 100까지 출력하려면 ```for```문의 ```i```를 출력하면 될 것 같습니다.   
아무런 제어 없이 ```i```만 출력한다면 1부터 100까지의 모든 수를 출력하게 되므로, ```if```문을 사용해 홀수만 골라서 출력하는 로직까지 작성해보겠습니다.
```cs
using System;

namespace Project1
{
    class source
    {
        static void Main(string[] args)
        {
            for (int i = 1; i <= 100; i++)
            {
                if (i % 2 != 0)
                {
                    Console.WriteLine(i);
                }
            }
        }
    }
}
```
```
출력 결과:
1
3
5
...
95
97
99
```

예상대로 홀수만 잘 출력되었습니다. ```if (i % 2 != 0)``` 이 ```if```문 덕분에 홀수만 출력이 될 수 있었습니다. **```i```를 2로 나눈 나머지가 0이 아닐 때, 즉 ```i```가 홀수일 때**만 ```i```를 출력하도록 제어합니다.

### 2. while
```while```문도 ```for```문과 유사한 로직을 사용하면 됩니다.

```cs
using System;

namespace Project1
{
    class source
    {
        static void Main(string[] args)
        {
            int a = 1;
            while (a <= 100)
            {
                if (a % 2 != 0)
                {
                    Console.WriteLine(a);
                }

                a++;
            }
        }
    }
}
```
```
출력 결과:
1
3
5
...
95
97
99
```

역시 똑같은 결과를 잘 출력합니다. 위와 매우 유사한 코드니 설명은 생략하겠습니다.

### 3. do-while
조금은 생소할 수도 있는 반복문인 ```do-while```문입니다.   
```do-while```문의 특징은 ```while```문과 달리 ```do``` 안의 코드를 먼저 실행 한 뒤 반복문의 제어조건을 확인합니다. 즉, **무조건 한 번 이상 실행됩니다.**   

```cs
using System;

namespace Project1
{
    class source
    {
        static void Main(string[] args)
        {
            int a = 1;
            do
            {
                if (a % 2 != 0)
                {
                    Console.WriteLine(a);
                }

                a++;
            }
            while (a <= 100);
        }
    }
}
```
```
출력 결과:
1
3
5
...
95
97
99
```
