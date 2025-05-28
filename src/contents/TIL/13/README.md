# 중력 반전을 통한 퍼즐 기믹
오늘은 특정 오브젝트에 대해 작용하는 중력의 방향을 반전시킬 수 있는 기능을 구현하고, 이를 통해 퍼즐을 풀어 방을 탈출하는 게임을 제작하였다.

<br><br>

### 1. 중력 시스템
Unity의 기본 중력 시스템은 ```Rigidbody.useGravity``` 속성을 통해 전역 중력 값을 사용하는 방식이라, 오브젝트마다 중력 방향을 다르게 주는 데에는 한계가 있었다.
<br>
그래서 ```Rigidbody.useGravity```값을 ```false```로 변경한 뒤, ```FixedUpdate()```에서 직접 ```Rigidbody.AddForce()```를 호출해 중력을 구현하였다. 또한 중력 반전을 위해서 ```_isGravityInverted``` 변수 값에 따라 아래와 같이 적용되도록 구현하였다.
```cs
_rigidbody.AddForce((_isGravityInverted ? Vector3.up : Vector3.down) * _gForce, ForceMode.Acceleration);
```
이를 통해 각 오브젝트마다 중력의 방향을 다르게 적용할 수 있었고, _isGravityInverted 값을 변경하여 방향을 반전시킬 수 있도록 했다.

<br><br>

### 2. 수평 공기저항
그런데 한가지 문제가 있었다. ```Rigidbody```의 ```Drag```값이 너무 작아 물체가 너무 가볍게 이동하는 문제가 생긴 것이다. 이를 해결하기 위해 ```Drag```값을 조정하면, 중력이 작용할 때 물체의 수직 속도까지 느려져 원하는 결과를 얻을 수 없었다.
<br>
그래서 여러 방법을 모색한 결과, 이 또한 ```FixedUpdate()``` 함수 내에서 ```Rigidbody.velocity```를 조정하면 된다는 것을 알게 되었다. 수평 공기저항을 적용시킨 코드는 아래와 같다.
```cs
Vector3 velocity = _rigidbody.velocity;
Vector3 horizontalVelocity = new Vector3(velocity.x, 0f, velocity.z);
horizontalVelocity *= 1f - _horizontalDrag * Time.fixedDeltaTime;
_rigidbody.velocity = new Vector3(horizontalVelocity.x, velocity.y, horizontalVelocity.z);
```
이를 통해 수직 낙하 속도에는 영향을 주지 않고, 수평 방향 이동 속도에만 감속 효과가 적용되도록 하였다.

<br><br>

### 3. 전체 코드
중력 방향 반전이 가능하도록 하는 클래스 ```MovableObject```의 전체 코드는 아래와 같다.
```cs
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public enum MovableObjectType
{
    Rack,
    Locker,
    Table,
    Desk
}

public class MovableObject : MonoBehaviour
{
    private Collider[] _colliders;
    private Rigidbody _rigidbody;
    public Rigidbody Rigidbody => _rigidbody;

    [SerializeField] private MovableObjectType _type;
    public MovableObjectType Type => _type;
    [SerializeField] private bool _isGravityInverted;
    [SerializeField] private float _gForce = 9.81f;
    [SerializeField] private float _gForceMax = 25f;
    [SerializeField] private float _mass;
    public float Mass => _mass;
    [SerializeField] private float _horizontalDrag;

    private Vector3 _initialPos;
    private Quaternion _initialRot;
    private bool _initialGravityInverted;

    private void Awake()
    {
        _colliders = GetComponentsInChildren<Collider>();
        _rigidbody = GetComponent<Rigidbody>();
        Singleton<MapUSystem>.Instance().MovableObjects.Add(this);
    }

    private void Start()
    {
        _initialPos = transform.position;
        _initialRot = transform.rotation;
        _initialGravityInverted = _isGravityInverted;

        _rigidbody.useGravity = false;
        _gForce = Mathf.Min(_gForce * _rigidbody.mass * 0.2f, _gForceMax);
    }

    private void FixedUpdate()
    {
        _rigidbody.AddForce((_isGravityInverted ? Vector3.up : Vector3.down) * _gForce, ForceMode.Acceleration);

        Vector3 velocity = _rigidbody.velocity;
        Vector3 horizontalVelocity = new Vector3(velocity.x, 0f, velocity.z);
        horizontalVelocity *= 1f - _horizontalDrag * Time.fixedDeltaTime;
        _rigidbody.velocity = new Vector3(horizontalVelocity.x, velocity.y, horizontalVelocity.z);
    }

    public void InvertGravity()
    {
        _isGravityInverted = !_isGravityInverted;
    }

    public void BackToInitial()
    {
        transform.SetPositionAndRotation(_initialPos, _initialRot);
        if (_initialGravityInverted != _isGravityInverted)
        {
            InvertGravity();
        }
    }
}
```

<br><br>

### 4. 마무리
마지막으로, 실제 플레이 gif를 첨부하며 오늘의 TIL을 마친다.
![플레이](/images/TIL/13/1.gif)