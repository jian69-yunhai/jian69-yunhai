import tkinter as tk
from tkinter import messagebox

class SimpleCalculator:
    def __init__(self, root):
        self.root = root
        self.root.title("简单计算器")
        
        # 创建标签和输入框
        self.label1 = tk.Label(root, text="第一个数字:")
        self.label1.grid(row=0, column=0, padx=5, pady=5)
        
        self.entry1 = tk.Entry(root)
        self.entry1.grid(row=0, column=1, padx=5, pady=5)
        
        self.label2 = tk.Label(root, text="第二个数字:")
        self.label2.grid(row=1, column=0, padx=5, pady=5)
        
        self.entry2 = tk.Entry(root)
        self.entry2.grid(row=1, column=1, padx=5, pady=5)
        
        # 创建计算按钮
        self.calc_button = tk.Button(root, text="计算", command=self.calculate)
        self.calc_button.grid(row=2, column=0, columnspan=2, pady=10)
        
        # 创建结果标签
        self.result_label = tk.Label(root, text="结果: ")
        self.result_label.grid(row=3, column=0, columnspan=2, pady=5)

    def calculate(self):
        try:
            # 获取输入值
            num1 = float(self.entry1.get())
            num2 = float(self.entry2.get())
            
            # 计算结果
            result = num1 + num2
            
            # 显示结果
            self.result_label.config(text=f"结果: {result}")
        except ValueError:
            messagebox.showerror("错误", "请输入有效的数字！")

def main():
    # 创建主窗口
    root = tk.Tk()
    app = SimpleCalculator(root)
    
    # 设置窗口大小和位置
    root.geometry("250x200")
    
    # 启动主循环
    root.mainloop()

if __name__ == "__main__":
    main()