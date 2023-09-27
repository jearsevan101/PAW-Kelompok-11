import pandas as pd

kota = pd.read_csv("./kota.csv")
kota = kota["regency"].tolist()

print("{\"kota\":", kota, end="}")

