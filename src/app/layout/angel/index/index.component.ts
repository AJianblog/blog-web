import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {UserService} from "../../../@core/interface/user-service";
import {CodeEnum} from "../../../entity/code-enum";
import {User} from "../../../model/user";
import {SnackBarService} from "../../../service/snackBar.service";
import {ImageSource} from "../../../utils/image-source";

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  productImgUrl: string[] = [
    "https://hezhijian.oss-cn-beijing.aliyuncs.com/blog/img/product-1.png",
    "https://hezhijian.oss-cn-beijing.aliyuncs.com/blog/img/product-2.png",
    "https://hezhijian.oss-cn-beijing.aliyuncs.com/blog/img/product-3.png",
    "https://hezhijian.oss-cn-beijing.aliyuncs.com/blog/img/product-4.png",
    "https://hezhijian.oss-cn-beijing.aliyuncs.com/blog/img/product-5.png",
  ];

  avatar: string = ImageSource.avatar;

  /**
   * 昵称
   */
  nickName: string;

  /**
   * 用户信息
   */
  userInfo: User;

  constructor(private route: ActivatedRoute, private userService: UserService, private snackbarService: SnackBarService) {
  }

  ngOnInit() {
    this.nickName = this.route.snapshot.paramMap.get('nickName');
    this.findUserByNickname();
  }

  /**
   * 查询用户的信息
   */
  findUserByNickname() {
    this.userService.findUserByNickname(this.nickName).subscribe(data => {
      if (data.code === CodeEnum.SUCCESS) {
        this.userInfo = data.data;
      } else {
        this.snackbarService.failure(data.message);
      }
    })
  }

}
