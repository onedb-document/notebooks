```mermaid
sequenceDiagram
    participant Alice
    participant John
    link Alice: 百度1 @ https://www.baidu.com/
    link Alice: 百度2 @ https://www.baidu.com/
    links John: {"百度1": "https://www.baidu.com/", "百度2": "https://www.baidu.com/"}
    Alice->>John: Hello John, how are you?
    John-->>Alice: Great!
    Alice-)John: See you later!
```
