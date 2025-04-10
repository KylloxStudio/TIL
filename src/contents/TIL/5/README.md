# 숫자 맞추기 게임

오늘은 C#을 사용해서 간단한 숫자 맞추기 게임을 만들어보겠습니다. 1부터 100까지의 랜덤한 숫자를 맞추는 게임입니다. 숫자를 입력하면 컴퓨터는 숫자가 더 크거나 작은지 힌트를 주며, 맞출 때까지 반복합니다.
   
### 소스 코드
```cs
using System;

namespace Project1
{
    class source
    {
        static void Main(string[] args)
        {
            Random random = new Random();
            int n = random.Next(1, 101);
            while (true)
            {
                Console.Write("Enter your guess (1-100): ");
                if (int.TryParse(Console.ReadLine(), out int guess))
                {
                    if (guess == n)
                    {
                        Console.WriteLine("Congratulations! You guessed the number.");
                        break;
                    }
                    else if (guess < n)
                    {
                        Console.WriteLine("Too low! Try again.");
                    }
                    else if (guess > n)
                    {
                        Console.WriteLine("Too high! Try again.");
                    }
                }
                else
                {
                    Console.WriteLine("Not a Number! Try again.");
                }
            }
        }
    }
}
```

### 출력 결과
```
Enter your guess (1-100): 50
Too low! Try again.
Enter your guess (1-100): 75
Too high! Try again.
Enter your guess (1-100): 62
Too high! Try again.
Enter your guess (1-100): 57
Too low! Try again.
Enter your guess (1-100): 59
Congratulations! You guessed the number.
```
   

```Random``` 클래스를 사용하여 1부터 100 사이의 랜덤한 정수를 변수에 저장합니다. 그 후, ```ReadLine```을 통해 사용자의 입력을 받아오고 ```int.TryParse```로 정수로 변환합니다.   
변환된 입력을 처음에 정한 숫자와 비교하여 사용자에게 힌트를 줍니다. 맞출 때까지 반복합니다.
