import os
import csv

# Path to collect data from the Resources folder
budget_data_csv = os.path.join('budget_data.csv')
#Mypath = "C:\Users\crnew\Desktop\Homework3_Python.py"


with open(budget_data_csv, 'r') as csvfile:
    # Split the data on commas
    csvreader = csv.reader(csvfile, delimiter=',')
    header = next(csvreader)
    data2 = list(csvreader)
    #print(data2)

#total months    
print(len(data2))

#Variables
Total = 0
Prev_revenue = 0
Revenue_change = 0
Revenue_changes = []

#Loop Through Rows (aka item) of data (aka data2)
#Revenue Changes: 
for item in data2:
    if Prev_revenue == 0: 
        continue
    # print(int(item[1]))
    Revenue_change = int(item[1]) - Prev_revenue
    Revenue_changes.append(Revenue_change)
    Prev_revenue = Revenue_change
print(Revenue_change)

#Add Total to Loss_Profit list:
Loss_Profits = []
for item in data2:
#    print(item)
    Loss_Profits.append(int(item[1]))
#print(Loss_Profits)
#sum[Loss_profits]


#find greatest changes
Greatest_Loss = min(Loss_Profits)
#print(Greatest_Loss)
Greatest_Decrease = Greatest_Loss - Revenue_change
print(Greatest_Decrease)

Greatest_Profit = max(Loss_Profits)
#print(Greatest_Profit)
Greatest_Increase = Greatest_Profit - Revenue_change
print(Greatest_Increase)

#Average Calculation
Average = (sum(Loss_Profits)) / (len(data2))
print(Average)


#Print out Table:
print("Financial Analysis")
print("---------------")
print(("Total Months: ") + (str(len(data2))))
print(("Total Revenue: ") + ("$") + (str(sum(Loss_Profits))))
print(("Average Change: ") + ("$") + (str(Average)))
print(("Greatest Increase: ") + ("$") + (str(Greatest_Increase)))
print(("Greatest Decrease: ") + ("$") + (str(Greatest_Decrease)))

#Output Files:
with open("output.txt", "w") as txt_file:
    txt_file.write(("Total Months: ") + (str(len(data2))))
    txt_file.write(("Total Revenue: ") + ("$") + (str(Loss_Profits)))
    txt_file.write(("Average Change: ") + ("$") + (str(Average)))
    txt_file.write(("Greatest Increase: ") + ("$") + (str(Greatest_Increase)))
    txt_file.write(("Greatest Decrease: ") + ("$") + (str(Greatest_Decrease)))




# Greatest_increase = max(data2)
# print(Greatest_increase)

#     Greatest_loss = min(data2)
# print(Greatest_loss)

#     # Total amount of profits/losses 
#     Total_
# Profits_losses = Profits_losses.sum()

#     #Average change in profits/losses:
#     def average(Profits_losses):
#         length = len(numbers)
#         total = 0.0
#         for number in numbers:
#             total += number
#         return total / length

#     #Greatest increase in profits
#     Greatest_increase = max(Profits_losses)

#     #Greatest loss
#     Greatest_loss = min(Profits_losses)


# Define the function
# def accounting(budget_data):
#     # For readability
#     Date = budget_data[0]
#     Profits_losses = int(budget_data[1])

#     # Total number of monts in dataset
#     Total_months = Date.count()
 
#     # Total amount of profits/losses 
#     Total_Profits_losses = Profits_losses.sum()

#     #Average change in profits/losses:
#     def average(Profits_losses):
#         length = len(numbers)
#         total = 0.0
#         for number in numbers:
#             total += number
#         return total / length

#     #Greatest increase in profits
#     Greatest_increase = max(Profits_losses)

#     #Greatest loss
#     Greatest_loss = min(Profits_losses)

#     #Print out Table:
#     print("Financial Analysis")

# # Read in the CSV file
# with open(budget_data_csv, 'r') as csvfile:

#     # Split the data on commas
#     csvreader = csv.reader(csvfile, delimiter=',')

#     header = next(csvreader)