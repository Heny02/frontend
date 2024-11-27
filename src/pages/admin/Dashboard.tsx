import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserCircle, Users, Building2, Calendar } from "lucide-react";

const DashboardPage: React.FC = () => {
  const stats = [
    { title: "Dentistes", value: 42, icon: UserCircle },
    { title: "Utilisateurs", value: 120, icon: Users },
    { title: "Départements", value: 8, icon: Building2 },
    { title: "Évaluations", value: 24, icon: Calendar },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Tableau de Bord</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default DashboardPage;
