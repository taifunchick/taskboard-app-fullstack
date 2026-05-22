FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["KanbanApi/KanbanApi.csproj", "KanbanApi/"]
RUN dotnet restore "KanbanApi/KanbanApi.csproj"
COPY . .
WORKDIR "/src/KanbanApi"
RUN dotnet build "KanbanApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "KanbanApi.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
EXPOSE 80
ENV ASPNETCORE_URLS=http://+:80
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "KanbanApi.dll"]