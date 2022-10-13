appName=roi-calculator
github_user_name=pesalu
location=westeurope
resourceGroupName=$appName-rg

az group create \
  --name $resourceGroupName \
  --location $location

az staticwebapp create \
  --name $appName \
  --resource-group $resourceGroupName \
  --source https://github.com/$github_user_name/$appName \
  --location $location \
  --branch main \
  --app-location "/" \
  --login-with-github