# 1 基础

Shell 是指一种应用程序，这个应用程序提供了一个界面，用户通过这个界面访问操作系统内核的服务。

## shell 脚本

Shell 脚本（shell script），是一种为 shell 编写的脚本程序。

业界所说的 shell 通常都是指 shell 脚本，但读者朋友要知道，shell 和 shell script 是两个不同的概念。

由于习惯的原因，简洁起见，本文出现的 "shell 编程" 都是指 shell 脚本编程，不是指开发 shell 自身。
变量名和等号之间不能有空格

## demo 1

```
#!/bin/bash
echo "Hello World !"
```

#! 是一个约定的标记，它告诉系统这个脚本需要什么解释器来执行，即使用哪一种 Shell。

echo 命令用于向窗口输出文本。

### 执行方法

#### （1）作为可执行程序

```
chmod +x ./test.sh  #使脚本具有执行权限
./test.sh  #执行脚本
```

直接写 test.sh，linux 系统会去 PATH 里寻找有没有叫 test.sh 的，而只有 /bin, /sbin, /usr/bin，/usr/sbin 等在 PATH 里，你的当前目录通常不在 PATH 里，所以写成 test.sh 是会找不到命令的，要用 ./test.sh 告诉系统说，就在当前目录找。

#### (2) 作为解释器参数

```
/bin/sh test.sh
/bin/php test.php
```

，直接运行解释器,这种方式运行的脚本，不需要在第一行指定解释器信息，写了也没用。

# 2 Shell 变量

## (1) 定义

✨ 变量名和等号之间不能有空格
其他和 Java 变量类似

## （2）使用

使用一个定义过的变量，只要在变量名前面加美元符号即可

```
your_name="qinjx"
echo $your_name
echo ${your_name}
```

变量名外面的花括号是可选的，加不加都行，**加花括号是为了帮助解释器识别变量的边界**，比如下面这种情况：

```
for skill in Ada Coffe Action Java; do
    echo "I am good at ${skill}Script"
done
```

如果不给 skill 变量加花括号，写成 echo "I am good at $skillScript"，解释器就会把$skillScript 当成一个变量（其值为空），代码执行结果就不是我们期望的样子了。

## （3）只读变量

使用 readonly 命令可以将变量定义为只读变量，只读变量的值不能被改变。  
下面的例子尝试更改只读变量，结果报错：

```
#!/bin/bash
myUrl="http://www.google.com"
readonly myUrl
myUrl="http://www.runoob.com"

// 运行脚本，结果如下：

/bin/sh: NAME: This variable is read only.
```

## （4）删除变量

使用 unset 命令可以删除变量。  
变量被删除后不能再次使用。unset 命令不能删除只读变量。

```
#!/bin/sh
myUrl="http://www.runoob.com"
unset myUrl
echo $myUrl

// 以上实例执行将没有任何输出。
```

## （5）变量类型

运行 shell 时，会同时存在三种变量：

- 1. 局部变量 局部变量在脚本或命令中定义，仅在当前 shell 实例中有效，其他 shell 启动的程序不能访问局部变量。
- 2. 环境变量 所有的程序，包括 shell 启动的程序，都能访问环境变量，有些程序需要环境变量来保证其正常运行。必要的时候 shell 脚本也可以定义环境变量。
- 3. shell 变量 shell 变量是由 shell 程序设置的特殊变量。shell 变量中有一部分是环境变量，有一部分是局部变量，这些变量保证了 shell 的正常运行

## （6）shell 字符串

字符串可以用单引号，也可以用双引号，也可以不用引号.

### A 单引号

单引号字符串的限制：

- 单引号里的任何字符都会原样输出，单引号字符串中的变量是无效的；
- 单引号字串中不能出现单独一个的单引号（对单引号使用转义符后也不行），但可成对出现，作为字符串拼接使用。

### B 双引号

```
your_name='runoob'
str="Hello, I know you are \"$your_name\"! \n"
echo -e $str
```

```
Hello, I know you are "runoob"!
```

- 双引号里可以有变量
- 双引号里可以出现转义字符

### C 拼接字符串

```
your_name="runoob"
# 使用双引号拼接
greeting="hello, "$your_name" !"
greeting_1="hello, ${your_name} !"
echo $greeting  $greeting_1
# 使用单引号拼接
greeting_2='hello, '$your_name' !'
greeting_3='hello, ${your_name} !'
echo $greeting_2  $greeting_3
```

```
// 输出结果
hello, runoob ! hello, runoob !
hello, runoob ! hello, ${your_name} !
```

### D 获取字符串长度

```
string="abcd"
echo ${#string} #输出 4
```

### E 提取字符串

```
string="runoob is a great site"
echo ${string:1:4} # 输出 unoo
```

### F 查找字符串

查找字符 i 或 o 的位置(哪个字母先出现就计算哪个)：

```
string="runoob is a great site"
echo `expr index "$string" io`  # 输出 4
```

以上脚本中 ` 是反引号，而不是单引号 '，不要看错了哦。

## （7）Shell 数组

bash 支持一维数组（不支持多维数组），并且没有限定数组的大小

### A 定义

```
数组名=(值1 值2 ... 值n)

// 如
array_name=(value0 value1 value2 value3)

// 或
array_name=(
value0
value1
value2
value3
)

// 还可以单独定义数组的各个分量：
array_name[0]=value0
array_name[1]=value1
array_name[n]=valuen
```

**可以不使用连续的下标，而且下标的范围没有限制。**

### B 读取数组

```
${数组名[下标]}

// 使用 @ 符号可以获取数组中的所有元素，例如：
echo ${array_name[@]}
```

### C 获取数组的长度

// 获取数组长度的方法与获取字符串长度的方法相同，例如：

```
# 取得数组元素的个数
length=${#array_name[@]}
# 或者
length=${#array_name[*]}
# 取得数组单个元素的长度
lengthn=${#array_name[n]}
```

## (8) Shell 注释

以 # 开头的行就是注释，会被解释器忽略。

```
# 这是一个注释

```

如果在开发过程中，遇到大段的代码需要临时注释起来，过一会儿又取消注释，怎么办呢？

每一行加个#符号太费力了，可以把这一段要注释的代码用一对花括号括起来，定义成一个函数，没有地方调用这个函数，这块代码就不会执行，达到了和注释一样的效果。

## （9）多行注释

```
:<<EOF
注释内容...
注释内容...
注释内容...
EOF

// EOF也可以使用其他符号:

:<<'
注释内容...
注释内容...
注释内容...
'

:<<!
注释内容...
注释内容...
注释内容...
!
```

# 3 Shell 传递参数

向脚本传递参数，脚本内获取参数的格式为：\$n。n 代表一个数字，1 为执行脚本的第一个参数，2 为执行脚本的第二个参数，以此类推……

```
// $0 为执行的文件名

echo "Shell 传递参数实例！";
echo "执行的文件名：$0";
echo "第一个参数为：$1";
echo "第二个参数为：$2";
echo "第三个参数为：$3";
```

```
$ chmod +x test.sh
$ ./test.sh 1 2 3
Shell 传递参数实例！
执行的文件名：./test.sh
第一个参数为：1
第二个参数为：2
第三个参数为：3
```

## 参数处理

| 参数处理 | 说明                                                                                                                    |
| -------- | ----------------------------------------------------------------------------------------------------------------------- |
| \$#      | 传递到脚本的参数个数                                                                                                    |
| \$\*     | 以一个单字符串显示所有向脚本传递的参数。如"$*"用「"」括起来的情况、以"$1 $2 … $n"的形式输出所有参数。                   |
| \$\$     | 脚本运行的当前进程 ID 号                                                                                                |
| \$!      | 后台运行的最后一个进程的 ID 号                                                                                          |
| \$@      | 与$*相同，但是使用时加引号，并在引号中返回每个参数。如"$@"用「"」括起来的情况、以"$1" "$2" … "\$n" 的形式输出所有参数。 |
| \$-      | 显示 Shell 使用的当前选项，与 set 命令功能相同。                                                                        |
| \$?      | 显示最后命令的退出状态。0 表示没有错误，其他任何值表明有错误。                                                          |

# 4 Shell 数组

## 1 获取数组中的所有元素

使用@ 或 \* 可以获取数组中的所有元素

```
#!/bin/bash
# author:菜鸟教程
# url:www.runoob.com

my_array[0]=A
my_array[1]=B
my_array[2]=C
my_array[3]=D

echo "数组的元素为: ${my_array[*]}"
echo "数组的元素为: ${my_array[@]}"
```

## 2 获取数组长度

```
 ${#my_array[*]
 ${#my_array[@]}
```

# [5 Shell 基本运算符](https://www.runoob.com/linux/linux-shell-basic-operators.html)

包括：

- 算数运算符
- 关系运算符
- 布尔运算符
- 字符串运算符
- 文件测试运算符

原生 bash 不支持简单的数学运算，但是可以通过其他命令来实现，例如 awk 和 expr，expr 最常用。

expr 是一款表达式计算工具，使用它能完成表达式的求值操作。

```
// 两个数相加(注意使用的是反引号 ` 而不是单引号 ')：

#!/bin/bash

val=`expr 2 + 2`
echo "两数之和为 : $val"
```

字符和运算符之间要有空格，例如 2+2 是不对的，必须写成 2 + 2，这与我们熟悉的大多数编程语言不一样。
完整的表达式要被 ` ` 包含

## 1 算数运算符

| 运算符 | 说明                                          | 举例                          |
| ------ | --------------------------------------------- | ----------------------------- |
| +      | 加法                                          | `expr $a + $b` 结果为 30。    |
| -      | 减法                                          | `expr $a - $b` 结果为 -10。   |
| \*     | 乘法                                          | `expr $a \* $b` 结果为 200。  |
| /      | 除法                                          | `expr $b / $a` 结果为 2。     |
| %      | 取余                                          | `expr $b % $a` 结果为 0。     |
| =      | 赋值                                          | a=\$b 将把变量 b 的值赋给 a。 |
| ==     | 相等。用于比较两个数字，相同则返回 true。     | [ $a == $b ] 返回 false。     |
| !=     | 不相等。用于比较两个数字，不相同则返回 true。 | [ $a != $b ] 返回 true。      |

条件表达式要放在方括号之间，并且要有空格，例如: [$a==$b] 是错误的，必须写成 [ $a == $b ]

```
a=10
b=20

val=`expr $a + $b`
echo "a + b : $val"

val=`expr $a - $b`
echo "a - b : $val"

val=`expr $a \* $b`
echo "a * b : $val"

val=`expr $b / $a`
echo "b / a : $val"

val=`expr $b % $a`
echo "b % a : $val"

if [ $a == $b ]
then
   echo "a 等于 b"
fi
if [ $a != $b ]
then
   echo "a 不等于 b"
fi
```

- 乘号(\*)前边必须加反斜杠(\)才能实现乘法运算；
- if...then...fi 是条件语句，后续将会讲解。
- 在 MAC 中 shell 的 expr 语法是：\$((表达式))，此处表达式中的 "\*" 不需要转义符号 "\" 。

## 2 关系运算符

关系运算符只支持数字，不支持字符串，除非字符串的值是数字。

| 运算符 | 说明                                                  | 举例                       |
| ------ | ----------------------------------------------------- | -------------------------- |
| -eq    | 检测两个数是否相等，相等返回 true。                   | [ $a -eq $b ] 返回 false。 |
| -ne    | 检测两个数是否不相等，不相等返回 true。               | [ $a -ne $b ] 返回 true。  |
| -gt    | 检测左边的数是否大于右边的，如果是，则返回 true。     | [ $a -gt $b ] 返回 false。 |
| -lt    | 检测左边的数是否小于右边的，如果是，则返回 true。     | [ $a -lt $b ] 返回 true。  |
| -ge    | 检测左边的数是否大于等于右边的，如果是，则返回 true。 | [ $a -ge $b ] 返回 false。 |
| -le    | 检测左边的数是否小于等于右边的，如果是，则返回 true。 | [ $a -le $b ] 返回 true。  |

## 3 布尔运算符

| 运算符 | 说明                                                | 举例                                     |
| ------ | --------------------------------------------------- | ---------------------------------------- |
| !      | 非运算，表达式为 true 则返回 false，否则返回 true。 | [ ! false ] 返回 true。                  |
| -o     | 或运算，有一个表达式为 true 则返回 true。           | [ $a -lt 20 -o $b -gt 100 ] 返回 true。  |
| -a     | 与运算，两个表达式都为 true 才返回 true。           | [ $a -lt 20 -a $b -gt 100 ] 返回 false。 |

## 4 逻辑运算符

| 运算符 | 说明       | 举例                                       |
| ------ | ---------- | ------------------------------------------ |
| &&     | 逻辑的 AND | [[ $a -lt 100 && $b -gt 100 ]] 返回 false  |
| \|\|   | 逻辑的 OR  | [[ $a -lt 100 \|\| $b -gt 100 ]] 返回 true |

## 5 字符串运算符

下表列出了常用的字符串运算符，假定变量 a 为 "abc"，变量 b 为 "efg"：
运算符|说明|举例
--|--|--
= 检测两个字符串是否相等，相等返回 true。 [ $a = $b ] 返回 false。
!= 检测两个字符串是否相等，不相等返回 true。 [ $a != $b ] 返回 true。
-z 检测字符串长度是否为 0，为 0 返回 true。 [ -z $a ] 返回 false。
-n 检测字符串长度是否为 0，不为 0 返回 true。 [ -n "$a" ] 返回 true。
$	检测字符串是否为空，不为空返回 true。	[ $a ] 返回 true。

## 6 文件测试运算符

用于检测 Unix 文件的各种属性。
见原文链接

# 6 echo 命令

用于字符串的输出

## 1. 显示普通字符串

```
echo "It is a test"
```

这里的双引号完全可以省略，以下命令与上面实例效果一致：

```
echo It is a test
```

## 2. 显示转义字符

```
echo "\"It is a test\""

// 结果
"It is a test"
```

## 3. 显示变量

read 命令从标准输入中读取一行,并把输入行的每个字段的值指定给 shell 变量

```
#!/bin/sh
read name
echo "$name It is a test"
```

以上代码保存为 test.sh，name 接收标准输入的变量，结果将是:

```
[root@www ~]# sh test.sh
OK                     #标准输入
OK It is a test        #输出
```

## 4. 显示换行

```
echo -e "OK! \n" # -e 开启转义
echo "It is a test"

// 输出结果：

OK!

It is a test
```

## 5.显示不换行

```
#!/bin/sh
echo -e "OK! \c" # -e 开启转义 \c 不换行
echo "It is a test"

// 输出结果：

OK! It is a test
```

## 6. 显示结果定向至文件

```
echo "It is a test" > myfile
```

## 7. 原样输出字符串，不进行转义或取变量(用单引号)

```
echo '$name\"'
```

## 8. 显示命令执行结果

```
echo `date`

// 这里使用的是反引号 `, 而不是单引号 '。

// 结果将显示当前日期

Thu Jul 24 10:08:46 CST 2014
```

# [7 Shell printf 命令](https://www.runoob.com/linux/linux-shell-printf.html)

使用 printf 的脚本比使用 echo 移植性好

printf 使用引用文本或空格分隔的参数，外面可以在 printf 中使用格式化字符串，还可以制定字符串的宽度、左右对齐方式等。默认 printf 不会像 echo 自动添加换行符，我们可以手动添加 \n。

```
printf  format-string  [arguments...]
```

- format-string: 为格式控制字符串
  arguments: 为参数列表。
- format-string: 为格式控制字符串
  arguments: 为参数列表。

```
// echo命令默认换行
$ echo -e "Hello, Shell\n"
Hello, Shell
$
# 等于
$ printf "Hello, Shell\n\n"
Hello, Shell
$
```

```
printf "%-10s %-8s %-4s\n" 姓名 性别 体重kg
printf "%-10s %-8s %-4.2f\n" 郭靖 男 66.1234
printf "%-10s %-8s %-4.2f\n" 杨过 男 48.6543
printf "%-10s %-8s %-4.2f\n" 郭芙 女 47.9876
执行脚本，输出结果如下所示：
```

```
姓名     性别   体重kg
郭靖     男      66.12
杨过     男      48.65
郭芙     女      47.99
```

%-10s 指一个宽度为 10 个字符（-表示左对齐，没有则表示右对齐），任何字符都会被显示在 10 个字符宽的字符内，如果不足则自动以空格填充，超过也会将内容全部显示出来。

%-4.2f 指格式化为小数，其中.2 指保留 2 位小数。

# 8 test 命令

## 1 数值测试

用于检查某个条件是否成立，它可以进行数值、字符和文件三个方面的测试。
参数|说明
--|--
-eq |等于则为真
-ne |不等于则为真
-gt |大于则为真
-ge |大于等于则为真
-lt |小于则为真
-le |小于等于则为真

```
num1=100
num2=100
if test $[num1] -eq $[num2]
then
    echo '两个数相等！'
else
    echo '两个数不相等！'
fi

// 输出结果：

两个数相等！
```

## 2 文件测试

## 3 字符串测试

# [9 流程控制](https://www.runoob.com/linux/linux-shell-process-control.html)

sh 的流程控制不可为空

```
<?php
if (isset($_GET["q"])) {
    search(q);
}
else {
    // 不做任何事情
}
```

如果 else 分支没有语句执行，就不要写这个 else

## 1 if else

```
if...
then...
elif...
then...
else...
then...
fi
```

## 2 for 循环

```
for var in item1 item2 ... itemN
do
    command1
    command2
    ...
    commandN
done
```

==cur==
