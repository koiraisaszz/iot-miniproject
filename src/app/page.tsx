'use client'

import { Data } from "@/types/Data";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import React, { useEffect, useState } from "react";
import { Bell, Gauge, Volume2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
export default function Home() {

  const [items, setItems] = useState([]);

  const buzzeraction = (id: number, tbl_led: number) => {
    fetch('/api/client', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, tbl_led })
    })
  }



  useEffect(() => {
    async function getUsers() {
      try {
        const res = await fetch('/api/client');
        if (!res.ok) {
          console.error('Failed to fetch data');
          return;
        }
        const data = await res.json();
        setItems(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    getUsers()
    const interval = setInterval(getUsers, 4000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-2xl font-bold mb-6 text-center">Sensor Data Display</h1>
      <div className="grid grid-cols-1 gap-4">
        {items.map((item: Data) => (
          <Card key={item.id} className="w-full">
            <CardHeader>
              <CardTitle>Sensor</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col justify-center">
              <div className="flex items-center mb-4">
                <Volume2 className="mr-2 h-4 w-4" />
                <p className="text-sm font-medium">Ultrasonic Value:</p>
                <Badge variant="secondary" className="ml-auto">
                  {item.light_value} Lux
                </Badge>
              </div>
              <div>
                <Button className="w-full"
                  onClick={() => buzzeraction(item.id, item.tbl_led == 0 ? 1 : 0)}
                >
                  {item.tbl_led  == 0 ? "LED ON" : "LED OFF"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
