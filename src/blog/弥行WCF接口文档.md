---
title: '弥行WCF接口调用文档'
pubDate: 2025-02-13
description: '此文档为弥行WCF接口调用文档，由服务器开发提供给客户端开发使用'
author: '弥行W'
image:
    url: 'http://www.mission-info.com/images/logo.gif'
    alt: 'The mission-info logo'
tags: ["mission-info", "WCF", "API", "Document"]
---


# 调用说明
此文档为弥行WCF接口调用文档，由服务器开发提供给客户端开发使用。调用这些接口遵循.NET中WCF接口调用方法：

- 第 1 步：在app.config配置文件中指定endpoint的相关信息。

- 第 2 步：在代码中初始化WcfChannel（或者通过ChannelFactory方式）。

- 第 3 步：在WcfChannel上调用接口对应的C#方法。

# 接口种类
## 机器操作API

说明：提供对与机器有关各项属性的操作。如获取机器绑定信息、设置机器属性等。

请求地址：`http://<host:port>/RMS.Service/MachineHSMS/`

*接口列表：*

###   1.  更新机器属性

- 接口说明：

   - 方法名：`bool updateEQ_AttributeData (string machine, string _Name, object _Value);`

   - 更新机器的属性`_Name`为`_Value`。

- 接口调用参数：

    | 字段名 | 数据类型 | 描述 | 备注 |
    | --- | --- | --- | --- |
    | machine | string | 机器ID |  |
    | _Name | String | 要设置的属性的名称 |  |
    | _Value | String | 要设置属性的值 |  |

- 输出结果：`true` 或者 `false`

- 调用示例：

```
public static Boolean updateEQ_AStatus(string machine, string _Name, object _Value)
{
    var Clinet_HSMS = new WcfClient<MachineHSMS.IMachineHSMS>();
    bool result = Clinet_HSMS.UseService(S => S.updateEQ_AttributeData(machine, _Name, _Value));
    bool b = true;
    if (SingalLinkMachine.GetSingalMachine(machine, out string linkedMachine))
    {
        b = Clinet_HSMS.UseService(S => S.updateEQ_AttributeData(linkedMachine, _Name, _Value));
    }
    return (result&&b);
}

```

###   2.  根据机器Id获取机器信息列表

- 接口说明：

  - 方法名： `List<object> GetMachine(List<string> MachineID);`

- 接口调用参数：

    | 字段名 | 数据类型 | 描述 | 备注 |
    | --- | --- | --- | --- |
    | MachineID | List<string> | 机器ID列表 |  |

- 输出结果：

  - 结果类型为`List<object>`，object有以下属性：

    | 字段名 | 数据类型 | 描述 | 备注 |
    | --- | --- | --- | --- |
    | AutoEchecker | bool |  |  |
    | BondHead | string |  |  |
    | Bond_Parameter | BondParameter |  |  |
    | CallEchecker | bool |  |  |
    | CheckFormList | Dictionary<string, RMS_WCF.MachineHSMS.AutoCheckData |  |  |
    | CurrentQTY | Int |  |  |
    |  |  |  |  |
    |  |  |  |  |

- 调用示例：

```
private void RedMagzine_Load(object sender, EventArgs e)
{
    LanguageProcess.TransLang(this);
    this.authorityTextBox1.textBox1.Focus();
    authorityTextBox1.checkBox1.Enabled = true;

    var MH = new RMS_WCF.WcfClient<RMS_WCF.MachineHSMS.IMachineHSMS>();
    List<object> equipList = MH.UseService(s => s.GetMachine(new List<string>() { EQ }));

    if (equipList == null || equipList.Count == 0)
    {
        return;
    }

    authorityTextBox1.KVP = new KeyValuePair<Equipment, string>((Equipment)equipList[0], "Enable_QA");

    authorityTextBox1.textBox1.LostFocus += button1_Click;
}

```

##   用户及权限管理API

说明：用户登录、权限设置、用户信息管理等

请求地址：`http://<host:port>/RMS.Service/RTS_User/`

*接口列表：*

###   1.  更新用户密码

- 接口说明：

  - 方法名：`bool updatepassword(string user, string pwd, string newPWD);`

  - 将用户密码从`pwd`更新为`newPWD`。

- 接口调用参数：

    | 字段名 | 数据类型 | 描述 | 备注 |
    | --- | --- | --- | --- |
    | user | string | 用户名 |  |
    | pwd | String | 用户的旧密码 |  |
    | newPWD | String | 将要设置的新密码 |  |

- 输出结果：`true` 或者`false`。

- 调用示例：

```
private void button1_Click(object sender, EventArgs e)
{
    if (string.IsNullOrEmpty(txtNewPassword.Text.Trim()))
    {
        MessageBox.Show(LanguageProcess.GetValue("SYSM000040")); //SYSM000040 请输入新的密码！

        return;
    }
    if (this.txtNewPassword.Text == this.txtNewPassword2.Text)
    {
        var Clinet_RTS = new WcfClient<RMS_WCF.RTS.IRTS_User>();
        if (Clinet_RTS.UseService(S =>S.updatepassword(txtuserID.Text, txtPassword.Text, txtNewPassword.Text)))
        {
            MessageBox.Show(LanguageProcess.GetValue("SYSM000033")); //SYSM000033 密码修改成功！

        }
    }
}

```

###   2.  用户登录XXXX

- 接口说明：

  - 方法名： `System.Data.DataTable Login(string user, string pwd);`