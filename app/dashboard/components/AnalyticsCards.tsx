"use client";

import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card } from "@/app/components";
import { User } from "@/app/store/slices/usersSlice";

interface AnalyticsCardsProps {
  users: User[];
}

const AnalyticsCards = ({ users }: AnalyticsCardsProps) => {
  const ageRangeData = useMemo(() => {
    const ranges = {
      "20-30": 0,
      "31-40": 0,
      "41-50": 0,
      "51-60": 0,
      "60+": 0,
    };

    users.forEach((user) => {
      if (user.age >= 20 && user.age <= 30) ranges["20-30"]++;
      else if (user.age >= 31 && user.age <= 40) ranges["31-40"]++;
      else if (user.age >= 41 && user.age <= 50) ranges["41-50"]++;
      else if (user.age >= 51 && user.age <= 60) ranges["51-60"]++;
      else if (user.age > 60) ranges["60+"]++;
    });

    return Object.entries(ranges).map(([range, count]) => ({
      range,
      count,
    }));
  }, [users]);

  const cityData = useMemo(() => {
    const cityCounts: { [key: string]: number } = {};

    users.forEach((user) => {
      const city = user.address?.city || "Unknown";
      cityCounts[city] = (cityCounts[city] || 0) + 1;
    });

    return Object.entries(cityCounts)
      .map(([city, count]) => ({
        city: city.substring(0, 10),
        count,
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);
  }, [users]);

  return (
    <>
      <Card title="Age Distribution">
        <div className="w-full h-full">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={ageRangeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card title="Top Cities">
        <div className="w-full h-full">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={cityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="city" angle={-45} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </>
  );
};

export default AnalyticsCards;
