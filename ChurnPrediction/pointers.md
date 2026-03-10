#Model outputs churn probabilities.
#We compute expected loss = P(churn) × LTV.
#We intervene if expected benefit exceeds retention cost.
#This leads to optimal threshold = Cost / LTV.
#Alternatively, if budget is constrained, we rank by expected loss and target top N customers.

#SO WE SUCCESSFULLY BUILD A MODEL WHICH WILL SEE THRU UR CUSTOMER LISTS AND TELL U WHO IS ABOUT TO CHURN AND HOW MUCH DO THEY AFFECT TO UR COMPANY 
#AND THEN U CAN TARGET THOSE CUSTOMERS FIRST FOR RETENTION

#till now we have done trai-test split to the data...now to ensure our model gives stable performance we can do cross validation 
#and see if we get similar performance on different folds of the data and then we can be more confident about our model's performance in production.
#we will do 5 fold cross validation and see the roc auc score for each fold and then we will take the average of those scores to get the final roc auc score for the model.
#5 folds mean we will split the data into 5 parts and then we will train the model on 4 parts and test on the remaining part and 
#we will do this 5 times and then we will take the average of the roc auc scores to get the final roc auc score for the model.

#first we need to fix the right threshold value giving max profit by calculating Life time value / cost....if its greater than 1 then we will retain the customer else we will let em go.
#so to find the right threshold we do optimization



#here we are creating a table results same as x_test and adding cols of acutal churn and churn probability
#then use those for calculating te lifetime value of the customer

#after predicting if the customer is churing or now ... now we need to decide which is more beneificial...
# 1. retaining a customer
# 2. losing a customer
#this we decide based upon the benefit the customer brings which is equal to the potential 
# revenue from the customer minus the cost of retention

# we will assume the cost of retention is 500(call center, discounts, coupons, pamplets etc)
# to calculate the potential revenue... we multiply the monthly charges and time

# we assume that the customer will stay for the next 12 months if we retain them and then we 
# can calculate the potential revenue as monthly charges * 12 - cost of retention 
# and if this value is positive then we will retain the customer else we will let em go.

#[tn fp]
#[fn tp]

#the main idea of this project is to find out which customers are likely to churn and then target those customers.
#if the benefit of retaining the customer is more than the cost of retention then we will retain the customer else let em go
#rn our threshold is 0.5 default so we reduce it 0.2 to reatin more customers and see if we get better performance from the model.
#we are basically being extra careful to retain the customers and we are ok with some false positives 
# as long as we are able to retain more customers and get better performance from the model.

#lbfgs and liblinear almost gave same roc auc score.(lbfgs is faster and a bit better)

#predict_proba gives the probability of the positive class and we take the second column of the output to get the probabilities of the positive class.
#roc_auc_score is a metric that is used to evaluate the performance of a binary classification model and it is calculated as the area under the
#  receiver operating characteristic curve (ROC curve) and it ranges from 0 to 1 and higher the value better the performance of the model.
#it maps true positive rate and false positive rate at different threshold values and gives us an idea of how well the model is able to distinguish between the positive and negative classes.


#so we know which features are most important
#larger the absolute value of the coefficient more important the feature is for predicting churn.
#pos coefficients means increasing the feature increases the probability of churn and neg coefficients means increasing the feature decreases the probability of churn.
#we are able to compare based on abs value only becauase we have scaled the numeric features and one hot encoded the categorical features so they are on the same scale
#so we can compare the coefficients directly.
#if too many features were there we could do feature selection fot like the top 20 or 25 features or so only



#convergence is saturation point where how much i ever i change my wieghts further the performance will not improve
#max_iter is hthe number of chances to adjust the weights to reach the convergence point and if we dont reach the convergence point 
# in those chances we get a warning that the model did not converge and we might not get the best performance from the model.

#l2 means its squares the error and adds it to the loss function to penalize the model for large coefficients and
# liblinear is a solver that is used for small datasets and it is a good choice for binary classification problems.
# lbfgs is a solver that is used for large datasets and it is a good choice for multiclass classification problems.
# C controls the regularization strength and it is a hyperparameter that we can tune to get better performance from the model.
# (higher the value of c less regularization)

#rn we have used 32 bit python which is enuf for basic ml but now for deep stuff like xgboost and production grade systems we need 64 bit python


#generally xgb is a rally good model but it is a very highr level complex model so since we are dealing with a smaller dtaset 7k rows only
#so thats why it might have overfitted thats why log is kinda doing better here
#also log doing good shows that a lot of linear relationships exists in the datasets

fit is learning the parameters of the pipeline and transform is applying those parameters to the data

We use simple imputer and not fillna method becoz when we use fillna method the median or mode iscalculated for 
train test aseparately and applies to that set only but when we use simple imputer the median or mode is calculated for
train set and applied to both train and test set which is the correct way to do it to avoid data leakage else we might not get the same level of
accuracy as we get on the test set when we deploy the model in production.

#so homebrew is a package manager for macos
#libomp is a library for parallel programming
#mpruntime is a tech that allows parallelism on macos

We change the target variable to binary for calculation of risk factor at the end to decide whether to retain the customer or not

Missing values will be filled after train test split to avoid data leakage.[filling missing values now will alter the test data also]