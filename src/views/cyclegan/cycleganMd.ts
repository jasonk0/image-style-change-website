export default {
	text: `


## 前言

本文记录下我在部署windows环境下CycleGAN所遇到的问题及解决办法，不代表最终可以完成部署。

> 我使用的是Pytorch版本的CycleGan。但是我的训练跑起来非常耗时间，不知道是不是我的配置不对。显卡是1050ti

## Lua-Torch-CycleGAN

### The C compiler is not able to compile a simple test program

CMake版本不对，distro-torch官方库里，用的是3.6，建议下载3.6的CMake

### During handling of the above exception, another exception occurred:

pip install 时遇到的问题，是请求过于频繁；可以换个网络，或者等会儿再试试。我是吃了个饭再来安装就好了

### Windows环境下没有wget

> [GnuWin](https://sourceforge.net/projects/gnuwin32/files/wget/1.11.4-1/wget-1.11.4-1-setup.exe/download?use_mirror=udomain)下载地址
>
> [环境变量配置](https://blog.csdn.net/wsp_1138886114/article/details/86698957)

下载：下载GnuWin

安装并配置环境变量：

- 新建变量 \`GNU_HOME\`： \`GNU_HOME=C:\Program Files (x86)\GnuWin32\`(自己的安装地址)
- 在 \`Path\`变量中添加： \`%GNU_HOME%\bin\`

验证：\`wget\`

### Can not find environment variable VisualStudioVersion, msvc is not setup porperly

找不到MSVC环境，需要再Visual Studio的命令窗运行，再自带的cmd是不行的

下载过Visual Studio之后，可以在开始找到\`x64 Native Tools Commond Prompt VS 2022\`

**管理员身份运行**，进入torch的目录运行install.bat

> x86指的是32位，x64指的是64位；以及Visual Studio带来的几个命令行工具差别
>
> **Developer Command Prompt**- 将环境设置为使用 32 位 x86 原生工具来构建 32 位 x86 原生代码。
>
> **x86 Native Tools Command Prompt**- 将环境设置为使用 32 位 x86-native 工具构建 32 位 x86-native 代码。
>
> **x64 Native Tools Command Prompt** - 将环境设置为使用 64 位 x64-native 工具来构建 64 位 x64-native 代码。
>
> **x86_x64 Cross Tools Command Prompt** - 将环境设置为使用 32 位、x86 原生工具来构建 64 位、x64 原生代码。
>
> **x64_x86 Cross Tools Command Prompt** - 将环境设置为使用 64 位 x64 原生工具来构建 32 位 x86 原生代码。



### torch目录下运行install.bat之后没有动静

因为有些包已经不存在了，源地址已经找不到或者请求不下来了，比如dlfcn-win32、graphviz-2.38、wineditline-2.201。

像wineditline最旧的版本已经是2.205了，深究的话可以去install-deps里看源码，然后根据请求地址去找，这里只列出一个[wineditline](https://sourceforge.net/projects/mingweditline/files)。

> 上边这些参考[这篇博客](https://www.cxymm.net/article/u012955739/85161877)，这里对缺失文件的下载更全面

就算把这些依赖文件都手动下载下来，你会发现运行之后还是没动静，肯定是install命令里边还有一些东西需要修改，但是我懒，我另寻他法。

有位大哥直接把带有依赖可以直接运行的仓库放在了GitHub上，克隆下来，然后运行它的批处理文件（里边是配置一些环境变量）就可以了。可以直接使用luarocks。

地址[在这儿](https://github.com/hiili/WindowsTorch)

### luarocks install nngraph 安装不下来

包括其他几个依赖display和class，都可能存在这种网络问题，可以直接去torch的资源库里去搜索相应的包然后下载到本地，使用 \`luarocks install [目标文件夹下的luarocks文件]\`

## Pytorch-CycleGAN

###  ERROR: Exception: Traceback (most recent call last):

使用官网的命令去pip install却一直爆红，原因是网络问题，可以科学上网解决、或者手动去请求的网址一个个下载，再或者通过这个网址https://download.pytorch.org/whl/torch_stable.html，找到稍微老一点的版本也没差

关于如何寻找合适版本，这里举个例子我的是\`torch-1.8.1+cu111-cp38-cp38-win_amd64\`官方给的建议是1.8.2、cp38、cu113（你运行失败的时候可以看到下载那个资源失败），相对应的老版本是1.8.1、cp38、cu111。

### CycleGAN 积极拒绝

再train之前，需要启动visdom

\`\`\`shell
visdom
# Or
python -m visdom.server
\`\`\`

也可以不启动visdom，需要在train的命令后边加上配置 \`display_id 0\`意味着不使用可视化。

### Detected call of \`lr_scheduler.step()\` before \`optimizer.step()\`

\`UserWarning: Detected call of lr_scheduler.step() before optimizer.step(). In PyTorch 1.1.0 and later, you should call them in the opposite order: optimizer.step() before lr_scheduler.step(). Failure to do this will result in PyTorch skipping the first value of the learning rate schedule.\`

这个问题困扰我最久，官方库的issues也有这个问题，但是未解决，提供的方法，我也试了，结果是重新装了一遍，因为实在看不懂。

功夫不负有心人！最终还是让我找到了解决方法，既然字面意思就是前者应该再后者调用之后执行，那么就给他调换下位置不就行了。（其实是pytorch1.1.0之后，优化器的更新要放到学习率更新的前面）

找到这句并给他注释掉

![image-20220430222930491](C:\Users\jasonk0\AppData\Roaming\Typora\typora-user-images\image-20220430222930491.png)

然后来到最后，把上边那句挪过来

![image-20220430223032112](C:\Users\jasonk0\AppData\Roaming\Typora\typora-user-images\image-20220430223032112.png)

就ok了！

> 感谢这位博主的[博客](https://blog.csdn.net/qq_45368632/article/details/124388612)解救我于水深火热！

### OSError: [WinError 1455] 页面文件太小，无法完成操作。

内存太小了，我采取的方法是加上一个配置项\`--num_thread 0\`

这个配置不会降低训练速度，但是加载文件的时间会稍微多一点。

来源[issues](https://github.com/junyanz/pytorch-CycleGAN-and-pix2pix/issues/947)




`,
};
