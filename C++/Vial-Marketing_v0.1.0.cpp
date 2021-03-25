#include <iostream>
#include <math.h>
#include <vector>
#include <string>
#include <iomanip>
using namespace std;
double computeCosts(const double MIN_DEMAND[], const double MIN_BUDGET[], const double ADV_FACTOR[], double demand, double costs[]);
double computeDemand(const double MIN_DEMAND[], const double MIN_BUDGET[], const double ADV_FACTOR[], double currentBudget[]);
int computeDeriviative(const double MIN_DEMAND[], const double ADV_FACTOR[], double budget[]);
double deriviative[7];
double currentBudget[7];
double sum = 0;

int main()
{
	setlocale(0, "");
	const double MIN_BUDGET[13][7] = {{17000, 128000, 21000, 14000, 18000, 27000, 8000}, {19000, 115000, 23000, 12000, 23000, 24000, 11000}, {23000, 132000, 26000, 17000, 21000, 28000, 13000}, {23000, 132000, 26000, 17000, 21000, 28000, 13000}, {13000, 75000, 18000, 12000, 9000, 10000, 3000}, {32000, 340000, 70000, 39000, 85000, 18000, 14000}, {230000, 730000, 480000, 360000, 280000, 180000, 165000}, {47000, 210000, 52000, 39000, 85000, 18000, 23000}, {49000, 148000, 52000, 41000, 73000, 23000, 19000}, {42000, 148000, 55000, 41000, 70000, 24000, 26000}, {17000, 96000, 11000, 14000, 18000, 27000, 8000}, {32000, 156000, 23000, 46000, 41000, 31000, 45000}, {74000, 195000, 100000, 64000, 82000, 52000, 48000}};
	const double MIN_DEMAND[13][7] = {{0.000208,
									   0.000011,
									   0.000026,
									   0.000274,
									   0.000024,
									   0.000095,
									   0.000004},
									  {0.000221,
									   0.000011,
									   0.000027,
									   0.000250,
									   0.000026,
									   0.000090,
									   0.000004},
									  {0, 0, 0, 0, 0, 0, 0},
									  {0, 0, 0, 0, 0, 0, 0},
									  {0.000179,
									   0.000009,
									   0.000025,
									   0.000250,
									   0.000019,
									   0.000060,
									   0.000004},
									  {0, 0, 0, 0, 0, 0, 0},
									  {0, 0, 0, 0, 0, 0, 0},
									  {0.00015, 0.000013, 0.000036, 0.000504, 0.000041, 0.000077, 0.000006},
									  {0, 0, 0, 0, 0, 0, 0},
									  {0, 0, 0, 0, 0, 0, 0},
									  {0, 0, 0, 0, 0, 0, 0},
									  {0, 0, 0, 0, 0, 0, 0},
									  {0, 0, 0, 0, 0, 0, 0}};
	string listSeg[] = {"Moloko S", "Moloko P", "Chefir", "Ruazhanka", "Prostokvasha", "Smetana band", "Youghurt", "Tvorog", "Soft cheeze", "tverdiy cheeze", "Plavlennyi cheeze", "Zguscheniy milk", "Maslo (butter)"};
	const double ADV_FACTOR[7] = {1.4767, 1.16465, 1.26627, 1.5176, 1.2695, 1.3808, 1.1506};
	double demand, absoluteDemand, controlDemand;

	
LOOP:
	cout << "Vibery segment: " << endl;
	for (int i = 0; i < 13; i++)
	{
		cout << i + 1 << ": ";
		cout << listSeg[i] << endl;
	}
	int n;
	cout << "Nomer segmenta: ";
	cin >> n;
	n--;
	cout << "Neobhodimiy spros: ";
	cin >> demand;            
	cout << "Kakoy spros sledyuschego perioda?: ";
	cin >> absoluteDemand;
	demand /= absoluteDemand; //В demand храниться коэфициент необходимого рыночного эффекта 
	double costs[7];
	controlDemand = computeCosts(MIN_DEMAND[n], MIN_BUDGET[n], ADV_FACTOR, demand, costs);
	cout << "Neobhodimy vozmozhniy rynochniy effect: " << demand << endl;
	cout << "Pry tekushey reklame rynocniy effect budet: " << controlDemand << endl;
	cout << "Escho raz? (1 или 0)";
	int a;
	cin >> a;
	if (a == 1)
		goto LOOP;
	return 0;
}

double computeCosts(const double MIN_DEMAND[], const double MIN_BUDGET[], const double ADV_FACTOR[], double demand, double costs[])
{
	//Первое действие - начисление минимального рыночного эффекта
	double currentDemand = 0.0;

	for (int i = 0; i < 7; i++)
		currentBudget[i] = MIN_BUDGET[i];

	//Вычисление минимального значения, если оно выше, выход

	currentDemand += computeDemand(MIN_DEMAND, MIN_BUDGET, ADV_FACTOR, currentBudget); //Начисляем минимальный спрос по всем сегментам

	string listAdv[] = {"Internet: ", "TV: ", "Radio: ", "Transport: ", "Pressa: ", "Vnesniye: ", "Promouschen: "};
	
	if (currentDemand > demand) 
	{
		currentDemand += 0.0017;
	}

	while (currentDemand < (demand))
	{
		int i = computeDeriviative(MIN_DEMAND, ADV_FACTOR, currentBudget);
		currentBudget[i] *= 1.01;
		currentDemand = computeDemand(MIN_DEMAND, MIN_BUDGET, ADV_FACTOR, currentBudget) + 0.0017;
	}

	cout << "Result:" << endl;

	for (int i = 0; i < 7; i++)
	{
		cout << listAdv[i] << setprecision(9) << currentBudget[i] << endl;
		sum += currentBudget[i];
	}

	cout << "Summ = " << sum << endl;

	return currentDemand;
}

double computeDemand(const double MIN_DEMAND[], const double MIN_BUDGET[], const double ADV_FACTOR[], double currentBudget[])
{
	double budget[7], n[7];
	double temp[7];
	for (int i = 0; i < 7; i++)
	{
		budget[i] = currentBudget[i] / MIN_BUDGET[i];
		n[i] = log2(budget[i]);
		temp[i] = MIN_DEMAND[i] * pow(ADV_FACTOR[i], n[i]);
	}
	double sum = 0;
	for (int i = 0; i < 7; i++)
	{
		sum += temp[i];
	}

	return sum;
}

int computeDeriviative(const double MIN_DEMAND[], const double ADV_FACTOR[], double budget[]) //Считает какой из сегментов на данный момент самый выгодный
{

	int max = 0;
	for (int i = 0; i < 7; i++)
	{
		deriviative[i] = (MIN_DEMAND[i] * log(ADV_FACTOR[i]) * pow(ADV_FACTOR[i], (log(budget[i])/log(2)))) / (budget[i] * log(2));
		if (deriviative[i] > deriviative[max])
			max = i;
	}
	return max;
}