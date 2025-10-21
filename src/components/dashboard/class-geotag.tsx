'use client';

import { useState } from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { geotagData } from '@/lib/school-data';
import { MapPin } from 'lucide-react';

type GeotagKey = keyof typeof geotagData;

export function ClassGeotag() {
  const [filter, setFilter] = useState<GeotagKey>('school');

  const data = geotagData[filter];

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="font-headline">Class Geotag</CardTitle>
            <CardDescription>Student distribution by locality.</CardDescription>
          </div>
          <Select
            defaultValue="school"
            onValueChange={(value) => setFilter(value as GeotagKey)}
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="school">School-wide</SelectItem>
              <SelectItem value="class9">Class 9</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {data.map((item, index) => (
            <div key={item.location} className="flex items-center">
              <MapPin className="w-4 h-4 mr-3 text-muted-foreground" />
              <div className="flex-1 text-sm">{item.location}</div>
              <div className="text-sm font-bold">{item.students} students</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
