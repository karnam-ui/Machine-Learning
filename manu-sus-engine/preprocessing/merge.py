import pandas as pd
df1 = pd.read_csv('/Users/suhaas/Machine-Learning/manu-sus-engine/Summary.csv')
df2 = pd.read_csv('/Users/suhaas/Machine-Learning/manu-sus-engine/datasets/_h_batch_production_data.csv')
merged_df = pd.merge(df1, df2, on='Batch_ID', how='outer')
merged_df.to_csv('/Users/suhaas/Machine-Learning/manu-sus-engine/Merged_dataset.csv', index=False)