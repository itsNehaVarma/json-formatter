import { Component, OnInit, ViewChild } from '@angular/core';
import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'json-formatter';
  jsonData;
  // jsonData = {
  //   "0": [
  //     {
  //       "id": 10,
  //       "title": "House",
  //       "level": 0,
  //       "children": [],
  //       "parent_id": null
  //     }
  //   ],
  //   "1": [
  //     {
  //       "id": 12,
  //       "title": "Red Roof",
  //       "level": 1,
  //       "children": [],
  //       "parent_id": 10
  //     },
  //     {
  //       "id": 18,
  //       "title": "Blue Roof",
  //       "level": 1,
  //       "children": [],
  //       "parent_id": 10
  //     },
  //     {
  //       "id": 13,
  //       "title": "Wall",
  //       "level": 1,
  //       "children": [],
  //       "parent_id": 10
  //     }
  //   ],
  //   "2": [
  //     {
  //       "id": 17,
  //       "title": "Blue Window",
  //       "level": 2,
  //       "children": [],
  //       "parent_id": 12
  //     },
  //     {
  //       "id": 16,
  //       "title": "Door",
  //       "level": 2,
  //       "children": [],
  //       "parent_id": 13
  //     },
  //     {
  //       "id": 15,
  //       "title": "Red Window",
  //       "level": 2,
  //       "children": [],
  //       "parent_id": 12
  //     }
  //   ]
  // }
  formatedOutput;
  public editorOptions: JsonEditorOptions;
  @ViewChild(JsonEditorComponent, { static: false }) editor: JsonEditorComponent;
  @ViewChild('editorMult') editorMult: JsonEditorComponent;

  constructor() {
    this.editorOptions = new JsonEditorOptions();
    this.editorOptions.mode = 'code';
    this.editorOptions.modes = ['code', 'text', 'tree', 'view'];
  }

  ngOnInit(): void {
    // this.formatJson();
  }

  showJson(event): void {
    this.jsonData = event;
  }

  formatJson(): void {
    this.formatedOutput = [];
    if (this.jsonData[0]) {
      this.formatedOutput.push(this.jsonData[0][0]);
      if (this.jsonData[1]) {
        this.jsonData[1].forEach(element => {
          if (this.formatedOutput[0].id === element.parent_id) {
            this.formatedOutput[0].children.push(element);
          }
        });
        this.formatedOutput[0].children.forEach(element => {
          if (this.jsonData[2]) {
            this.jsonData[2].forEach(data => {
              if (element.id === data.parent_id) {
                element.children.push(data);
              }
            });
          }
        });
      }
      this.editorMult.set(this.formatedOutput);
    }

    console.log('this.formatedOutput', this.formatedOutput)
  }
}
